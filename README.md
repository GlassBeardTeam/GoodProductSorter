# GOOD PRODUCT SORTER

## Documento de diseño
Versión 0.5

### Glass Beard

- Adrián Poza Guillermo - Artista 
- Víctor González Rivera - Diseñador, programador
- Álvaro Ramírez Miguez - Diseñador, programador, sonido
- Manuel Aguado Salguero - Artista
- Miguel Ángel Arcones Ríos - Programador 

### Índice
[Pitch](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#pitch)
  * [Propósito y público objetivo](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#prop%C3%B3sito-y-p%C3%BAblico-objetivo)
  * [Plataforma](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#plataforma)
  
[Mecánicas](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#mec%C3%A1nicas)
  * [Puntuación](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#puntuaci%C3%B3n)
  * [Controles](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#controles)
  
[Interfaz](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#interfaz)

[Arte](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#arte)
  * [Historia](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#historia)
  * [Estética](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#est%C3%A9tica)
  * [Música y Sonido](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#m%C3%BAsica-y-sonido)
## Pitch
__Good Product Sorter__ es un juego de gestión con toques de humor en el que debes clasificar productos que van llegando a través de una cinta transportadora. Los productos y su clasificación van variando según se avanza en el juego, al igual que la dificultad.  
### Propósito y público objetivo
El proposito es crear un juego de gestión más accesible, con controles sencillos y partidas de corta duración.
El público objetivo estará formado tanto por jugadores casuales como habituales a los que les interesen los juegos de gestión. 
### Plataforma
El juego estará adaptado para cualquier dispositivo con navegador Chrome o Firefox (Pc, móvil, tablet...) y Facebook.
## Mecánicas
La mecánica principal del juego consiste en clasificar productos en distintas categorias, teniendo en cuenta las directrices propuestas en cada nivel (Por ejemplo, utilizar guantes para evitar contaminar ciertos productos). 
Si se acierta a la hora de clasificar un objeto se obtiene puntuación y se acelera la cinta transportadora, si se deja pasar se reduce la velocidad y si se coloca en la caja equivocada se resta puntuación.
La partida acaba después de 120 segundos y el objetivo es clasificar correctamente el mayor número de productos para alcanzar el mínimo de puntos necesarios para pasar al siguiente nivel.
### Puntuación
En el juego se llaman Puntos Positivos (a partir de ahora PP), se obtienen al enviar una caja con los productos correctos y se pierden si las cajas contienen productos mal clasificados. Dependiendo de los PP que se obtengan al finalizar el nivel se obtendrá de 0 a 3 estrellas. Cada nivel necesita un mínimo de estrellas para desbloquearlo.
### Controles
Para clasificar los objetos habrá que arrastrarlos o lanzarlos a su caja correspondiente, utilizando exclusivamente la pantalla táctil o el ratón dependiendo del dispositivo.
## Interfaz
El Diagrama de flujo es el siguiente:
![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/FlowChartProductSorter.png)
## Arte
### Historia
En __Good Product Sorter__ eres un trabajador precario con un piso pequeño y descuidado. 
Al comienzo del juego te llamará el jefe con un nuevo trabajo para ti. Cuando llegas te explica que de ahora en adelante te dedicarás a clasificar productos de empresas que os subcontraten, aunque no podrás cobrar porque se ha gastado todo en una cinta transportadora. Para compensar te dará puntos positivos como recompensa en caso de que hagas un buen trabajo, con los que podrás llegar a ser empleado del mes.

- Protagonista: Se trata de un avatar que no hará falta dibujar ya que no aparecerá en pantalla. En su piso guarda objetos extraños que consigue en el trabajo.
- Jefe: Se trata de un hombre de negocios fracasado que se cree un visionario. Tiene muy poca empatía y cree que te encanta el trabajo. Dice que tiene un chalet en Ibiza pero duerme en su oficina. Usa el micrófono inalámbrico para hablar con su madre.
### Estética
Estilo cartoon desenfadado, semejante a la animación de los años 30. La ambientación será actual, con escenarios deteriorados y decorado absurdo. Se busca que los productos se distingan con facilidad del escenario teniendo en cuenta la velocidad a la que espera jugar, aunque se podrán diseñar objetos similares que requieran que el jugador preste mayor atención.
Bocetos:

![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/boss.png)
(El Jefe).
![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/PantallaJuego.png)
(Pantalla de juego).
### Música y Sonido
La música debe recordar a una fábrica sin dejar de ser cómica y con ritmo. Dependiendo de la pantalla en la que se encuentre el jugador se busca:

- Crear deseo de volver a jugar en los menús.

- Generar urgencia en el jugador y ajustarse a la temática en los distintos niveles.

Además se crearán sonidos para:
- aceptar y cancelar opciones 
- introducir el producto en la caja correcta
- introducir el objeto en la caja incorrecta
- Dejar pasar el objeto
- Diálogos


© 2019 GitHub, Inc.
