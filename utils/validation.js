exports.validatePercentageSplit = (participants) => {
  const totalPercentage = participants.reduce((sum, participant) => sum + participant.percentage, 0);
  return totalPercentage === 100;
};
