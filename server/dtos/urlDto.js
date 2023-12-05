module.exports = class UrlDto {
    userId;
    originalUrl;
    shortUrl;
    clicks;
    id;

    constructor(model) {
        this.userId = model.username;
        this.originalUrl = model.email;
        this.shortUrl = model.role;
        this.clicks = model.isActivated;
        this.id = model._id;
    }
}