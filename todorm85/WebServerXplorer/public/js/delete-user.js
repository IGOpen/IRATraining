$('.confirmation').on('click', function () {
    var $this = $(this),
        username = $this.attr('data-username'),
        url = $this.attr('data-url'),
        isConfirmed = confirm('You will delete ' + username + '! Are you sure?');

    if (isConfirmed) {
        $.post(url, function (ss) {
            var $row = $this.closest('.user-row');
            $row.remove();
        });
    }
});
