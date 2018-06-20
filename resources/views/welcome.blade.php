<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Baytech Kanban</title>

    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <div class="container" style=' margin-top: 30px;'>
        
        <div id="sortableKanbanBoards" class="row">
                <form class="form-inline form-group"><span class='text-center' style='font-size:20px; margin-right:40px'>Baytech Kanban Board</span>
                    <input type="text" class="form-control" id="taskInput" required>
                    
                    <button class="btn-primary" id="submit" >Submit</button>
                </form>

                <hr>

            <!--sütun başlangıç-->
            <div class="panel panel-primary kanban-col">
                <div class="panel-heading">
                    TODO
                    <i class="fa fa-2x fa-plus-circle pull-right"></i>
                </div>
                <div class="panel-body">
                    <div id="TODO" class="kanban-centered">


                    </div>
                </div>
                
            </div>
            <!--sütun bitiş-->
            <!--sütun başlangıç-->
            <div class="panel panel-primary kanban-col">
                <div class="panel-heading">
                    DOING
                    <i class="fa fa-2x fa-plus-circle pull-right"></i>
                </div>
                <div class="panel-body">
                    <div id="DOING" class="kanban-centered">


                    </div>
                </div>
                
            </div>
            <!--sütun bitiş-->
            <!--sütun başlangıç-->
            <div class="panel panel-primary kanban-col">
                <div class="panel-heading">
                    DONE
                    <i class="fa fa-2x fa-plus-circle pull-right"></i>
                </div>
                <div class="panel-body">
                    <div id="DONE" class="kanban-centered">

                    </div>
                </div>
                
            </div>
            <!--sütun bitiş-->


        </div>
    </div>



    
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>