let defaultUser = ''
try {
  if (localStorage.user) {
    defaultUser = JSON.parse(localStorage.user)
  }
} catch (e) {
}
const state = {
  user: defaultUser,
  loginDialogVisible: false,
  registerDialogVisible: false,
  courseList: {
    FirstPage: true,
    LastPage: true,
    List: [],
    PageNo: 1,
    PageSize: 10,
    TotalCount: 10,
    TotalPage: 1
  },
  videoUrl: '',
  commentList: {
    FirstPage: true,
    LastPage: true,
    List: [{
      Comments: '',
      Created: '',
      User__Avatar: '',
      User__Nick_name: '',
      User__Uid: ''
    }],
    PageNo: 1,
    PageSize: 10,
    TotalCount: 10,
    TotalPage: 1
  }
}

export default state
