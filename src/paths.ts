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
  thresholdListPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}/threshold`;
  },
  challengeListPage(userId: string, notodoId: string) {
    return `/${userId}/notodo/${notodoId}/challenge`;
  },
  threadShowPage(userId: string, notodoId: string, thresholdId: string) {
    return `/${userId}/notodo/${notodoId}/threshold/${thresholdId}`;
  },
  challengeShowPage(userId: string, notodoId: string, challengeId: string) {
    return `/${userId}/notodo/${notodoId}/challenge/${challengeId}`;
  }
}
