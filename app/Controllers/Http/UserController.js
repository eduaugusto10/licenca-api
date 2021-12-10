"use strict";

const User = use("App/Models/User");

class UserController {
  async create({ request }) {
    const data = request.only([
      "name",
      "broker",
      "account",
      "license_validate",
      "plan",
      "email",
      "password",
      "administrator",
    ]);
    const user = await User.create(data);

    return user;
  }

  async index() {
    const user = User.all();

    return user;
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);
    let response = "vencido";
    //user.license_validate > new Date() ? true : false;
    if (user.account == params.account && user.license_validate > new Date())
      response = "liberado";

    return [{response:response}];
  }

  async destroy({ params, auth, response }) {
    const user = await User.findOrFail(params.id);

    await user.delete();
  }

  async update({ params, request, response }) {
    const user = await User.findOrFail(params.id);

    const data = request.only([
      "name",
      "broker",
      "account",
      "license_validate",
      "plan",
      "email",
      "password",
      "administrator",
    ]);

    user.merge(data);

    await user.save();

    return user;
  }
}

module.exports = UserController;
