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
  deleteNotodoPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}/delete`;
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
  }

}
