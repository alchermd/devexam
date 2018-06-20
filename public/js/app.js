$('document').ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    refresh();

    $('#submit').on('click', function (e) {
        e.preventDefault();
        description = $('#taskInput').val()
        $('#taskInput').val('')

        $('#submit').text('...');

        $.ajax({
            type: "POST",
            url: '/tasks',
            dataType : 'JSON',
            data: { 
                description: description, 
                _token: $('meta[name="csrf-token"]').attr('content') 
            },
            success: function () {
                $('#submit').text('Submit');
            }
        });
        $('.kanban-centered').empty();
        refresh();
    })

    
});

function refresh() {

    fetch('/tasks')
        .then(res => 
            res.json()
        )
        .then(res => {
            $('.kanban-centered').empty();
            $('.modal').remove();
            $('body').removeClass('modal-open')

            res.forEach(item => {
                if (item.status === 0) {
                    $('#TODO').append(
                        `<article class="kanban-entry grab" id="item${item.id}" draggable="true">
                            <div class="kanban-entry-inner">
                                <div class="kanban-label">
                                    <h2 class="text-center">${item.description}</h2>
                                    <hr>
                                    <button class='btn btn-secondary btn-block' data-toggle="modal" data-target="#modal${item.id}" data-backdrop="false">edit details</button>
                                    <button class='btn btn-primary btn-block doing' data-id='${item.id}'>move to DOING</button>

                                    <div class="modal fade" id="modal${item.id}" tabindex="-1" role="dialog" aria-labelledby="modal${item.id}" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="Label">Modal title</h4>
                                            </div>
                                            <div class="modal-body">
                                                <textarea class='form-control' id='newDesc${item.id}' >${item.description}</textarea>
                                                <select class='form-control' id='newStatus${item.id}'>
                                                    <option value='0' ${item.status == 0 ? 'selected' : ''}>TODO</option>
                                                    <option value='1' ${item.status == 1 ? 'selected' : ''}>DOING</option>
                                                    <option value='2' ${item.status == 2 ? 'selected' : ''}>DONE</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary task-update" data-id='${item.id}'>Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </article>`
                    )
                } else if (item.status === 1) {
                    $('#DOING').append(
                        `<article class="kanban-entry grab" id="item${item.id}" draggable="true">
                            <div class="kanban-entry-inner">
                                <div class="kanban-label">
                                <h2 class="text-center">${item.description}</h2>
                                <hr>
                                <button class='btn btn-secondary btn-block' data-toggle="modal" data-target="#modal${item.id}"  data-backdrop="false">edit details</button>
                                <button class='btn btn-warning btn-block todo' data-id='${item.id}'>move to TODO</button>
                                <button class='btn btn-success btn-block done' data-id='${item.id}'>move to DONE</button>

                                <div class="modal fade" id="modal${item.id}" tabindex="-1" role="dialog" aria-labelledby="modal${item.id}" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="Label">Modal title</h4>
                                            </div>
                                            <div class="modal-body">
                                                <textarea class='form-control' id='newDesc${item.id}' >${item.description}</textarea>
                                                <select class='form-control' id='newStatus${item.id}'>
                                                    <option value='0' ${item.status == 0 ? 'selected' : ''}>TODO</option>
                                                    <option value='1' ${item.status == 1 ? 'selected' : ''}>DOING</option>
                                                    <option value='2' ${item.status == 2 ? 'selected' : ''}>DONE</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary task-update" data-id='${item.id}'>Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>`
                    )
                } else if (item.status === 2) {
                    $('#DONE').append(
                        `<article class="kanban-entry grab" id="item${item.id}" draggable="true">
                            <div class="kanban-entry-inner">
                                <div class="kanban-label">
                                <h2 class="text-center">&#10004; ${item.description}</h2>
                                <hr>
                                    <button class='btn btn-secondary btn-block' data-toggle="modal" data-target="#modal${item.id}"  data-backdrop="false">edit details</button>
                                </div>

                                <div class="modal fade" id="modal${item.id}" tabindex="-1" role="dialog" aria-labelledby="modal${item.id}" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="Label">Modal title</h4>
                                            </div>
                                            <div class="modal-body">
                                                <textarea class='form-control' id='newDesc${item.id}' >${item.description}</textarea>
                                                <select class='form-control' id='newStatus${item.id}'>
                                                    <option value='0' ${item.status == 0 ? 'selected' : ''}>TODO</option>
                                                    <option value='1' ${item.status == 1 ? 'selected' : ''}>DOING</option>
                                                    <option value='2' ${item.status == 2 ? 'selected' : ''}>DONE</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary task-update" data-id='${item.id}'>Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </article>`
                    )
                }
                
                setListeners(item, refresh);
                
            })
        })
}

function setListeners(item) {
    $('.doing').on('click', function (e) {
        e.preventDefault()
        
        $.ajax({
            type: "POST",
            url: `tasks/${$(this).attr('data-id')}`,
            dataType : 'JSON',
            data: { 
                id: $(this).attr('data-id'),
                status: 1, 
                _method: 'PUT',
                _token: $('meta[name="csrf-token"]').attr('content') 
            },

            success: function (data) {
               refresh();
            },

            error: function (data, textStatus, errorThrown) {
        
            },
        });
    });

    $('.todo').on('click', function (e) {
        e.preventDefault()
        
        $.ajax({
            type: "POST",
            url: `tasks/${$(this).attr('data-id')}`,
            dataType : 'JSON',
            data: { 
                id: $(this).attr('data-id'),
                status: 0, 
                _method: 'PUT',
                _token: $('meta[name="csrf-token"]').attr('content') 
            },

            success: function (data) {
               refresh();
            },

            error: function (data, textStatus, errorThrown) {
        
            },
        });
    });

    $('.done').on('click', function (e) {
        e.preventDefault()
        
        $.ajax({
            type: "POST",
            url: `tasks/${$(this).attr('data-id')}`,
            dataType : 'JSON',
            data: { 
                id: $(this).attr('data-id'),
                status: 2, 
                _method: 'PUT',
                _token: $('meta[name="csrf-token"]').attr('content') 
            },

            success: function (data) {
               refresh();
            },

            error: function (data, textStatus, errorThrown) {
                refresh();
        
            },
        });
    });

    $('.task-update').on('click', function (e) {
        e.preventDefault()
        console.log("test");
        $.ajax({
            type: "POST",
            url: `tasks/${$(this).attr('data-id')}`,
            dataType : 'JSON',
            data: { 
                id: $(this).attr('data-id'),
                status: $(`#newStatus${item.id}`).val(),
                description: $(`#newDesc${item.id}`).val(), 
                _method: 'PUT',
                _token: $('meta[name="csrf-token"]').attr('content') 
            },

            success: function (data) {
                $('.modal').remove();
                refresh()
            },

            error: function (data, textStatus, errorThrown) {
                $('.modal').remove();
            },
        });
    });
}