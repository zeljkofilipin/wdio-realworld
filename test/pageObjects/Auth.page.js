class Auth {
  get $email () { return $('input[type="email"]'); }
  get $password () { return $('input[type="password"]'); }
  get $signIn () { return $('button*=Sign in'); }
  get $errorMessages () { return $('.error-messages li'); }

  async login(email, password) {
    await this.$email.setValue(email);
    await this.$password.setValue(password);
    await this.$signIn.click();
    browser.waitUntil(
      () => {
        const signInExists = this.$signIn.isExisting();
        const errorExists = this.$errorMessages.isExisting();
        return !signInExists || errorExists;
      },
      {
        timoutMsg:
          'The "Sign in" button still exists and an error never appeared'
      }
    );
  }
}
module.exports = Auth;