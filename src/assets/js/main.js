// Where to POST data to
var formUrl = 'http://jasonx.herokuapp.com/jrs.json'
// List of repos for placeholder
var repos = ['facebook/react', 'twbs/bootstrap', 'gliechtenstein/JasonConsoleAction']
// Foundation 6
$(document).foundation()
// Submit form placeholder
superplaceholder({
  el: document.querySelector('.repo-placeholder'),
  sentences: repos,
  options: {
    loop: true,
    shuffle: true,
    startOnFocus: false
  }
})
// Form submit
$('#form').submit((e) => {
  // Prevent default action
  e.preventDefault()
  var form = $('#form')
  var success = $('#success')
  var error = $('#error')
  // jQuery validation plugin
  form.validate()
  // Serialize form data to array
  var data = form.serializeArray()
  // Prepend github url to repo
  data[0].value = 'https://github.com/' + data[0].value
  if (form.valid()) {
    // Ajax POST data to formUrl
    $.ajax({
      url: formUrl,
      type: 'post',
      data: data,
      success: function (data, status, jqXHR) {
        console.log(data)
        console.log(status)
        console.log(jqXHR)
        error.hide()
        success.show()
        success.html('Success')
        success.html(jqXHR.responseText)
      },
      error: function (jqXHR, status, err) {
        console.log(jqXHR)
        success.hide()
        error.show()
        error.html('Error')
        error.html(
          jqXHR.status + ' ' + jqXHR.statusText
        )
        // l to not conflict with e
        for(var l = 0; l < jqXHR.responseJSON.errors.length; l++) {
          error.append('<br>' + jqXHR.responseJSON.errors[l].charAt(0).toUpperCase() + jqXHR.responseJSON.errors[l].substring(1))
        }
      }
    })
  }
})
