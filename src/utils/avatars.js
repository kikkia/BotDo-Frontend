exports.getAvatarUrl = function getAvatarUrl(userId, avatarId) {
    try {
        let format = avatarId.startsWith("a_") ? ".gif" : ".png";
        return "https://cdn.discordapp.com/avatars/" + userId + "/" + avatarId + format;
    }
    catch {
        return ""
    }
}