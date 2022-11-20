async function getDailyDistribution() {
  const contract = store.instance.staking;

  try {
    return await contract.rewardTokensByDay();
  } catch (err) {
    throw err;
  }
}

async function getStakeDataById(id) {
  const bigNumberValue = ethers.BigNumber.from(id.toString());
  const contract = store.instance.staking;

  try {
    return await contract.viewUserStakeAny(store.user.wallet, bigNumberValue);
  } catch (err) {
    throw err;
  }
}

async function approve(value) {
  const bigNumberValue = ethers.utils.parseEther(value.toString());
  const contract = store.instance.token;

  try {
    return await contract.approve(config.stakingContractAddress, bigNumberValue);
  } catch (err) {
    throw err;
  }
}

async function getStakesCount() {
  const contract = store.instance.staking;

  try {
    const stakesCount = await contract.getCountStake(store.user.wallet);
    return stakesCount.toNumber();
  } catch (err) {
    if (err.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw 'Need to approve';
    } else {
      throw err;
    }
  }
}

async function getAllStakesData() {
  const stakes = [];
  try {
    const stakesCount = await getStakesCount();

    for (let i = 0; i < stakesCount; i++) {
      const stakeData = await getStakeDataById(i);
      stakes.push(stakeData);
    }

    return stakes;
  } catch (err) {
    throw err;
  }
}

async function getStakedValue() {
  try {
    const stakes = await getAllStakesData();
    let weiTotalStaked = ethers.BigNumber.from(0);

    stakes.forEach((stake) => {
      weiTotalStaked = weiTotalStaked.add(stake._amount.toString());
    });

    return +ethers.utils.formatEther(weiTotalStaked.toString());
  } catch (err) {
    throw err;
  }
}

async function getTotalStakedValue() {
  try {
    return await store.instance.staking.totalStakedTokens();
  } catch (err) {
    throw err;
  }
}

async function getAvialableRewardById(id, shiftTime = 0) {
  const bigNumberValue = ethers.BigNumber.from(id.toString());
  const contract = store.instance.staking;

  try {
    return await contract.calcRewardByIndex(store.user.wallet, bigNumberValue, ethers.BigNumber.from(shiftTime));
  } catch (err) {
    throw err;
  }
}

async function getTotalRewardsValue(shiftTime = 0) {
  let totalRewards = ethers.BigNumber.from(0);

  try {
    const stakesCount = await getStakesCount();

    for (let i = 0; i < stakesCount; i++) {
      const { reward } = await getAvialableRewardById(i, shiftTime);
      totalRewards = totalRewards.add(reward.toString());
    }

    return totalRewards.toString();
  } catch (err) {
    throw err;
  }
}

async function claimRewards(id) {
  const contract = store.instance.staking;

  try {
    return await contract.getReward(store.user.wallet);
  } catch (err) {
    throw err;
  }
}

async function stake(amount) {
  const contract = store.instance.staking;
  const bigNumberValue = ethers.utils.parseEther(amount.toString());

  try {
    return await contract.stake(store.user.wallet, bigNumberValue);
  } catch (err) {
    throw err;
  }
}

async function unStake() {
  const contract = store.instance.staking;

  try {
    return await contract.unStake(store.user.wallet);
  } catch (err) {
    throw err;
  }
}
