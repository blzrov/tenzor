// const serverUrl = "http://localhost:3001/";
const serverUrl = "https://zoobrilka-alice-skill.herokuapp.com/";

class UserController {
  id;
  login;
  displayName;
  firstName;
  lastName;
  realName;
  sex;
  birthday;
  records;
  rating;

  async _exicute(uri, config) {
    return await fetch(serverUrl + uri, config)
      .then(async (res) =>
        res.status === 200 ? await res.json() : { response: {} }
      )
      .catch((error) => error);
  }

  signOut() {
    this.id = undefined;
    this.login = undefined;
    this.displayName = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.realName = undefined;
    this.sex = undefined;
    this.birthday = undefined;
    this.records = undefined;
    this.rating = undefined;
    return this;
  }

  async doLogin(code) {
    await this._exicute(`api/user/login?code=${code}`, {
      credentials: "include",
    });
    return this;
  }

  async getUserInfo() {
    const { response, error } = await this._exicute("api/user/info", {
      credentials: "include",
    });
    if (error || !response) return this;
    const {
      id,
      login,
      displayName,
      firstName,
      lastName,
      realName,
      sex,
      birthday,
      records,
      rating,
    } = response;
    this.id = id;
    this.login = login;
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.realName = realName;
    this.sex = sex;
    this.birthday = birthday;
    this.records = records;
    this.rating = rating;
    return this;
  }

  async getUsersRecords() {
    const { response, error } = await this._exicute("api/users/records");
    if (error) return [];
    return response;
  }

  async getUserRecords() {
    const { response, error } = await this._exicute(
      `api/user/${this.id}/records`
    );
    if (error) return [];
    return response;
  }

  async doSearch(value) {
    const { response, error } = await this._exicute(
      `api/search?title=${value}`
    );
    if (error) return [];
    return response;
  }

  async getRecords(poemId) {
    const { response, error } = await this._exicute(
      `api/records/${poemId ?? ""}`
    );
    if (error) return [];
    return response;
  }

  async getPoem(poemId) {
    const { response, error } = await this._exicute(`api/poem/${poemId}`);
    if (error) return null;
    return response;
  }

  async doVote(recordId, vote) {
    const body = new FormData();
    // body.append("userId", this.id);
    body.append("vote", vote);

    const options = {
      method: "POST",
      body,
      credentials: "include",
    };

    const { response, error } = await this._exicute(
      `api/record/${recordId}/vote`,
      options
    );
    if (error) return null;
    return response;
  }

  async getPoemRecord(poemId) {
    const { response, error } = await this._exicute(`api/records/${poemId}`);
    if (error) return [];
    return response;
  }

  async savePoemRecord(record, poemId, title) {
    const body = new FormData();

    body.append("record", record);
    // body.append("userId", this.id);
    body.append("poemId", poemId);
    body.append("ownerName", this.realName);
    body.append("poemName", title);

    let options = {
      method: "POST",
      body,
      credentials: "include",
    };

    const { response, error } = await this._exicute("api/record", options);
    if (error) return null;
    return response;
  }

  async removePoemRecord(recordId) {
    let options = {
      method: "DELETE",
      credentials: "include",
    };

    const { response, error } = await this._exicute(
      `api/record/${recordId}`,
      options
    );
    if (error) return null;
    return response;
  }
}

export default UserController;
