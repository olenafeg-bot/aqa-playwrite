

export default class LoginAPI {
 
  static async apiLogin(request, email, password, remember = true) {
    return await request.post('/api/auth/signin', {
      data: {
        email,
        password,
        remember,
      },
    });
  }
}
