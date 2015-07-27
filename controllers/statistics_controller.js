var models = require('../models/models.js');

exports.show = function(req,res){
  models.Quiz.count().then(function (npreguntas){

    models.Comment.count().then(function (ncomentarios){



      models.Quiz.findAll({
        include:[{model: models.Comment}]
        }).then(function (quizes){

          var preguntasConComentarios = 0;
          for (i in quizes){
              if (quizes[i].Comments.length)
                preguntasConComentarios++;
              }

          var preguntasSinComentarios = npreguntas - preguntasConComentarios;
          var mediaComentarios= ncomentarios / npreguntas;

          res.render('statistics/index', {npreguntas: npreguntas,
                                      ncomentarios: ncomentarios,
                                      mediaComentarios: mediaComentarios,
                                      preguntasConComentarios: preguntasConComentarios,
                                      preguntasSinComentarios: preguntasSinComentarios,
                                      errors: []
                                    });

      })

    })
  });
};
