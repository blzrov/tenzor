//const serverUrl = "http://localhost:3001/";
const serverUrl = "https://zoobrilka-alice-skill.herokuapp.com/";

class ServerController {
  async _exicute(uri, config) {
    return await fetch(serverUrl + uri, config)
      .then(async (res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 201 || res.status === 204)
          return { response: {} };
        else return { error: {} };
      })
      .catch((error) => error);
  }

  // signOut() {
  //   this.id = undefined;
  //   this.login = undefined;
  //   this.displayName = undefined;
  //   this.firstName = undefined;
  //   this.lastName = undefined;
  //   this.realName = undefined;
  //   this.sex = undefined;
  //   this.birthday = undefined;
  //   this.records = undefined;
  //   this.rating = undefined;
  //   return this;
  // }

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
    if (error || !response) {
      console.log("error");
      return null;
    }

    return response;
  }

  async getUsersRecords(offset) {
    const { response, error } = await this._exicute(
      "api/users/records?offset=" + offset
    );
    if (error) return [];
    return response;
  }

  async getUserRecords(id) {
    const { response, error } = await this._exicute(`api/user/${id}/records`);
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
    if (!this.realName) {
      alert("Войдите в аккаунт");
      return;
    }
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

  async getPoemRecord(poemId, offset) {
    const { response, error } = await this._exicute(
      `api/records/${poemId}?offset=` + offset
    );
    if (error) return [];
    return response;
  }

  async savePoemRecord(record, poemId, title) {
    if (!this.realName) {
      alert("Войдите в аккаунт");
      return "Войдите в аккаунт";
    }
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
    //return response;
    return "Запись отправлена";
  }

  async removePoemRecord(recordId) {
    const options = {
      method: "POST",
      credentials: "include",
    };

    const { response, error } = await this._exicute(
      `api/record/${recordId}/delete`,
      options
    );
    if (error) return null;
    return response;
  }
}

export default ServerController;
