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
    const response = user.license_validate > new Date() ? true : false;

    return response;
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
