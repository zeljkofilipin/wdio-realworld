class Register {
  get email() { return $('input[placeholder="Email"]'); }

  get error() { return $('.error-messages'); }

  get password() { return $('input[placeholder="Password"]'); }

  get signUp() { return $('.btn'); }

  get username() { return $('input[placeholder="Username"]'); }

  async register(username, email, password) {
    await this.username.setValue(username);
    await this.email.setValue(email);
    await this.password.setValue(password);
    await this.signUp.click();
  }
}
module.exports = Register;
