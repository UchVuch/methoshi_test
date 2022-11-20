$(document).ready(function () {
  $('#connectBtn').on('click', function () {
    togglePopup('connectWallet', true);
  });

  $('#stakeBtn').on('click', function () {
    togglePopup('stakeMeto', true);
  });

  $('#metamaskBtn').on('click', async function () {
    try {
      await handleConnectMetamask();
      await handleUpdateData();
    } catch (err) {
      console.error(err);
    }
  });

  $('#harvestBtn').on('click', async function () {
    try {
      $('#harvestBtn').attr('disabled', true);

      await claimRewards();
      await handleUpdateData();
    } finally {
      $('#harvestBtn').attr('disabled', false);
    }
  });

  $('#withdrawDepBtn').on('click', async function () {
    try {
      $('#withdrawDepBtn').attr('disabled', true);

      await unStake();
      await handleUpdateData();
    } finally {
      $('#withdrawDepBtn').attr('disabled', false);
    }
  });

  $('#approveBtn').on('click', async function () {
    const dailyDistribution = 1e27,
      coefficient = 0.000000000000000001;

    try {
      $('#approveBtn').attr('disabled', true);

      await approve(ethers.BigNumber.from(Math.round(dailyDistribution * coefficient)));

      localStorage.setItem('approved', true);
      $('#approveBtn').addClass('hideme');
      $('#stakeBtn').removeClass('hideme');
    } catch (err) {
      console.error(err);
    } finally {
      $('#approveBtn').attr('disabled', false);
    }
  });

  $('#amountToStake').on('input', function () {
    const submitBtn = $('#stakeMetoForm').find('input[type=submit]');

    if (+$(this).val()) submitBtn.attr('disabled', false);
    else submitBtn.attr('disabled', true);
  });

  $('#stakeMetoForm').on('submit', async function (e) {
    e.preventDefault();
    const submitBtn = $(this).find('input[type=submit]');

    try {
      submitBtn.attr('disabled', true);
      await stake($('#amountToStake').val());

      setInterval(async () => {
        await handleUpdateData();
      }, 10000);
    } finally {
      submitBtn.attr('disabled', false);
      togglePopup('stakeMeto', false);
    }
  });
});

async function handleConnectMetamask() {
  $('#connectBtn #connectBtnText').attr('disabled', true).text('Connecting...');

  const provider = await connect(),
    signer = provider.getSigner(),
    tokenContractInstance = new ethers.Contract(config.tokenContractAddress, tokenABI, signer),
    stakingContractInstance = new ethers.Contract(config.stakingContractAddress, stakingABI, signer),
    approved = localStorage.getItem('approved');

  store.instance.token = tokenContractInstance;
  store.instance.staking = stakingContractInstance;

  $('#connectBtn').addClass('hideme');
  !approved ? $('#approveBtn').removeClass('hideme') : $('#stakeBtn').removeClass('hideme');

  $('#withdrawDepBtn').attr('disabled', false);

  togglePopup('connectWallet', false);
}

async function handleUpdateBalance() {
  const balance = await store.instance.token.balanceOf(store.user.wallet);
  $('#tokenBalance #tokenBalanceValue').text(Math.floor(+ethers.utils.formatEther(balance.toString())));
  return balance;
}

async function handleUpdateEarnedMeto(totalRewardsValueByMonth, coefficient) {
  $('#earnedMeto #earnedMetoValue').text(Math.floor(totalRewardsValueByMonth * coefficient));
  if (!totalRewardsValueByMonth) $('#harvestBtn').attr('disabled', true);
  else $('#harvestBtn').attr('disabled', false);
}

async function handleUpdateTotalStakedValue(metoStaked) {
  $('#staked').removeClass('hideme');
  $("[data-id='stakedTokens']").text(Math.floor(metoStaked));
}

async function handleUpdateTotalRewardsValue(totalRewardsValue, rewardTokensByDay, totalStakedTokens, coefficient) {
  $('#unlockedReward').find('#unlockedRewardValue').text(Math.trunc(((totalRewardsValue/(10**18))* 100) / 100));

  $('#totalRewards')
    .find('#totalRewardsValue')
    .text(Math.floor(((rewardTokensByDay * coefficient * 365) / +(totalStakedTokens * coefficient)) * 100) + '%' || 0);
}

async function handleUpdateData() {
  const coefficient = 0.000000000000000001,
    totalRewardsValue = await getTotalRewardsValue(),
    totalRewardsValueByMonth = await getTotalRewardsValue(2678400),
    rewardTokensByDay = await getDailyDistribution(),
    totalStakedTokens = await getTotalStakedValue(),
    allStakesData = await getAllStakesData(),
    metoStaked = allStakesData.reduce((acc, stakedToken) => {
      if (!(stakedToken._endTime * 1)) acc += stakedToken._amount * coefficient;

      return acc;
    }, 0);

  await handleUpdateBalance();
  await handleUpdateTotalRewardsValue(totalRewardsValue, rewardTokensByDay, totalStakedTokens, coefficient);
  await handleUpdateEarnedMeto(totalRewardsValueByMonth, coefficient);
  await handleUpdateTotalStakedValue(metoStaked);

  console.log({ allStakesData });
}

function togglePopup(name, open) {
  $(`#${name}Popup`)[open ? 'fadeIn' : 'fadeOut']('fast');
  $('body')[open ? 'addClass' : 'removeClass']('noscroll');
}
