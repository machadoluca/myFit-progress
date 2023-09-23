const exercisesByCategory = {
    Biceps: [
      { name: 'Rosca bíceps direta com barra', image: require('../assets/exerciseImages/Biceps_Direta_Barra.png'), },
      { name: 'Rosca bíceps direta com barra e pegada ampla', image: require('../assets/exerciseImages/Biceps_Direta_Barra_Ampla.png'),} ,
      { name: 'Rosca bíceps direta com halteres', image: require('../assets/exerciseImages/Biceps_Direta_halteres.png'), },
      { name: 'Rosca bíceps em pé na barra EZ', image: require('../assets/exerciseImages/Biceps_pé_barra_EZ.png'), },
    ],
    Peito: [
      {name:"Supino reto com barra", image: require("../assets/exerciseImages/Supino_Reto_Barra.png")},
      {name:"Supino reto com halteres", image: require("../assets/exerciseImages/Supino_Reto_halteres.png")},
      {name:"Flexão de braços básica", image: require("../assets/exerciseImages/Flexao_Braco_Basico.png")},
      {name:"Supino inclinado com barra", image: require("../assets/exerciseImages/Supino_Inclinado_Barra.png")},
      {name:"Supino inclinado com halteres", image: require("../assets/exerciseImages/Supino_Inclinado_halteres.png")},
      {name:"Peito nas paralelas", image: require("../assets/exerciseImages/Peito_Paralelas.png")},
    ],
    Perna: [
      {name:"Agachamento", image: require("../assets/exerciseImages/Agachamento.png")},
      {name:"Stiff", image: require("../assets/exerciseImages/Stiff.png")},
      {name:"Extensora", image: require("../assets/exerciseImages/Extensora.png")},
      {name:"Leg press", image: require("../assets/exerciseImages/Leg_Press.png")},
    ], 
};

export default exercisesByCategory