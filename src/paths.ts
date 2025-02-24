export const paths = {
  homePage(userId: string) {
    return `/${userId}`;
  },
  notodoListPage(userId: string) {
    return `/${userId}/notodo`;
  },
  notodoShowPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}`;
  },
  createNotodoPage(userId: string) {
    return `/${userId}/notodo/create`;
  },
  editNotodoPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}/edit`;
  },
  editThresholdPage(userId: string, notodoId: string, thresholdId: string) {
    return `/${userId}/notodo/${notodoId}/threshold/${thresholdId}/edit`;
  },
  deleteNotodoPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}/delete`;
  },
  deleteThresholdPage(userId: string, notodoId: string, thresholdId: string) {
    return `/${userId}/notodo/${notodoId}/threshold/${thresholdId}/delete`;
  },
  thresholdListPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}/threshold`;
  },
  createThresholdPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}/threshold/create`;
  },
  challengeListPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}/challenge`;
  },
  giveupChallengePage(userId: string, notodoId: string, challengeId: string) {
    return `/${userId}/notodo/${notodoId}/challenge/${challengeId}/giveup`;
  },
  threadShowPage(userId: string, notodoId: string, thresholdId: string) {
    return `/${userId}/notodo/${notodoId}/threshold/${thresholdId}`;
  },
  challengeShowPage(userId: string, notodoId: string, challengeId: string) {
    return `/${userId}/notodo/${notodoId}/challenge/${challengeId}`;
  },
  rewardListPage(userId: string) {
    return `/${userId}/reward`;
  },
  rewardShowPage(userId: string, rewardId: string) {
    return `/${userId}/reward/${rewardId}`;
  },
  rewardCreatePage(userId: string) {
    return `/${userId}/reward/create`;
  },
  rewardEditPage(userId: string, rewardId: string) {
    return `/${userId}/reward/${rewardId}/edit`;
  },
  rewardDeletePage(userId: string, rewardId: string) {
    return `/${userId}/reward/${rewardId}/delete`;
  },
  rewardClaimListPage(userId: string, rewardId: string) {
    return `/${userId}/reward/${rewardId}/claims`;
  },
  rewardClaimShowPage(userId: string, rewardId: string, rewardClaimId: string) {
    return `/${userId}/reward/${rewardId}/claims/${rewardClaimId}`;
  },
  editRewardClaimPage(userId: string, rewardId: string, rewardClaimId: string) {
    return `/${userId}/reward/${rewardId}/claims/${rewardClaimId}/edit`;
  },
  deleteRewardClaimPage(userId: string, rewardId: string, rewardClaimId: string) {
    return `/${userId}/reward/${rewardId}/claims/${rewardClaimId}/delete`;
  },
  achievementListPage(userId: string) {
    return `/${userId}/achievement`;
  },
  createAchievementPage(userId: string) {
    return `/${userId}/achievement/create`;
  },
  editAchievementPage(userId: string, achievementId: string) {
    return `/${userId}/achievement/${achievementId}/edit`;
  },
  achievementShowPage(userId: string, achievementId: string) {
    return `/${userId}/achievement/${achievementId}`;
  }
}
