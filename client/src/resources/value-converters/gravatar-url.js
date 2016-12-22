export class GravatarUrlValueConverter {
  toView(email, size) {
    if (email !== undefined) {
      var size = size || 80;
      var html = '<img class="img-circle" src="https://secure.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '.jpg?s=' + size + '"/>';
      return html;
    } else {
      return "<span class='glyphicon glyphicon-user'></span>"
    }
  }
}