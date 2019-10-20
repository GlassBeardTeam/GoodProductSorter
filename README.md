# GOOD PRODUCT SORTER

## Documento de diseño
Versión 1.0

### Glass Beard

![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/AllBranch/GDD%20Images/Logo(200x200).png)
- Adrián Poza Guillermo - Artista 
- Víctor González Rivera - Diseñador, programador
- Álvaro Ramírez Míguez - Diseñador, programador, sonido
- Manuel Aguado Salguero - Artista
- Miguel Ángel Arcones Ríos - Programador 

### Índice
[Pitch](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#pitch)
  * [Propósito y público objetivo](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#prop%C3%B3sito-y-p%C3%BAblico-objetivo)
  * [Plataforma y monetización](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#plataforma-y-monetizaci%C3%B3n)
  
[Mecánicas](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#mec%C3%A1nicas)
  * [Puntuación](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#puntuaci%C3%B3n)
  * [Controles](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#controles)
  
[Interfaz](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#interfaz)

[Arte](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#arte)
  * [Historia](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#historia)
  * [Estética](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#est%C3%A9tica)
  * [Música y Sonido](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#m%C3%BAsica-y-sonido)
  
[Redes Sociales](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/README.md#redes-sociales)

## Pitch
__Good Product Sorter__ es un juego de gestión con toques de humor en el que se debe clasificar productos que van llegando a través de una cinta transportadora. Los productos y su clasificación van variando según se avanza en el juego, al igual que su temática, con la intención de sorprender al jugador mostrando objetos que no se esperaría encontrar. 
### Propósito y público objetivo
El propósito es crear un juego de gestión más accesible, con controles sencillos y partidas de corta duración.
El público objetivo comprende tanto jugadores casuales como habituales, interesados en juegos de gestión. 
### Plataforma y monetización
El juego estará adaptado para cualquier dispositivo con navegador Chrome o Firefox (Pc, móvil, tablet...) y Facebook.
Contará con publicidad en el juego y contenido descargable de pago (nuevos niveles con distintas temáticas, elementos estéticos, etc.).

## Mecánicas
La mecánica principal del juego consiste en clasificar productos en distintas cajas, teniendo en cuenta las directrices propuestas en cada nivel (Por ejemplo, utilizar guantes para evitar contaminar ciertos productos).

Si se acierta a la hora de clasificar un objeto se obtiene puntuación y se acelera la cinta transportadora, si se deja pasar se reduce la velocidad y si se coloca en la caja equivocada se resta puntuación manteniendo la velocidad.

La partida acaba después de 2 minutos y el objetivo es clasificar correctamente el mayor número de productos para alcanzar el mínimo de puntos necesarios y pasar al siguiente nivel.

Los niveles del juego estarán divididos en distintos mundos, cada uno con su temática. La dificultad irá aumentando progresivamente incrementando tanto la cantidad de objetos que se deben clasificar como las instrucciones a seguir. En un principio los objetos se clasificarán en 2 categorías, pero no se descarta aumentar también el número de categorías para hacerlo más complicado.

![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/Juego3.PNG)

(Pantalla de juego).

Además en determinados niveles aparecerán objetos únicos que podrás introducir en tu mochila y que desencadenarán eventos especiales (por ejemplo, que un personaje te ofrezca algo a cambio de tomar prestada cierta mercancía).
### Controles
Buscamos que los controles sean lo más sencillos posibles para evitar que sea menos cómodo jugar en unas plataformas que en otras.

Para clasificar los objetos se podrán tanto arrastrar como lanzar a su caja correspondiente, utilizando la pantalla táctil o el ratón dependiendo del dispositivo. De esta forma, es menos probable que el jugador no acierte en la caja a la hora de soltar el objeto.

La navegación de los menús también se controlará exclusivamente con la pantalla táctil o el ratón.
### Puntuación
En el juego se llaman Puntos Positivos (a partir de ahora PP), se obtienen al enviar una caja con los productos correctos y se pierden si la caja contiene productos mal clasificados. Dependiendo de los PP que se obtengan al finalizar el nivel se obtendrá de 0 a 3 estrellas. Cada nivel necesita un mínimo de estrellas para desbloquearlo.

## Interfaz
El Diagrama de flujo entre pantallas es el siguiente:

![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/FlowChartProductSorter.png)

![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/Menu.PNG)

__Mundos:__ Selección del mundo en el que vas a jugar (cada uno tendrá una temática distinta).
* Niveles: Selección del nivel (Se mostrarán las estrellas conseguidas en cada uno).
* Juego
* Fin del Juego: indicará tanto la puntuación como los aciertos/fallos realizados por el jugador.

__Casa:__ en el piso del protagonista podrás ver los objetos especiales que has obtenido a lo largo de la historia.

__Ajustes:__ se podrá modificar el volumen de la música y los sonidos.

(Se añadirán imágenes de las pantallas en cuanto estén disponibles)

## Arte
### Historia
En __Good Product Sorter__ eres un trabajador precario con un piso pequeño y descuidado. 
Al comienzo del juego te llamará el jefe con un nuevo trabajo para ti. Cuando llegas te explica que de ahora en adelante te dedicarás a clasificar productos de empresas que os subcontraten, aunque no podrás cobrar porque se ha gastado todo en una cinta transportadora. Para compensar te dará puntos positivos como recompensa en caso de que hagas un buen trabajo, con los que podrás llegar a ser empleado del mes.

__Personajes__
- Protagonista: Se trata de un avatar que no hará falta dibujar ya que no aparecerá en pantalla. En su piso guarda objetos extraños que consigue en el trabajo.
- Jefe: Se trata de un hombre de negocios fracasado que se cree un visionario. Tiene muy poca empatía y cree que te encanta el trabajo. Dice que tiene un chalet en Ibiza pero duerme en su oficina. Conseguir que valore tu trabajo es más complicado que su negocio funcione.

### Estética
Estilo cartoon desenfadado, inspirada en la animación de los años 30 pero con estilo propio. La ambientación será actual, con escenarios deteriorados y decorado absurdo. Se busca que los productos se distingan con facilidad teniendo en cuenta la velocidad a la que espera jugar, aunque se podrán diseñar objetos similares que requieran que el jugador preste mayor atención.

Bocetos:

![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/BolsaSangre.png)
![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/tijeras.png)
![Error al cargar la imagen](https://github.com/GlassBeardTeam/GoodProductSorter/blob/master/GDD%20Images/Jefe2.png)


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


## Redes Sociales
E-mail: GlassBeardTeam@gmail.com

Twitter: [@glass_beard](https://twitter.com/glass_beard)

YouTube: [GlassBeard Team](https://www.youtube.com/channel/UCJsIbbIKmbcrgtMvDwL1Ogw/featured?view_as=subscriber)

Portfolio: [Glass Beard Team](https://glassbeardteam.github.io/Portfolio/)

Itch.io: [Good Product Sorter] (https://glassbeard.itch.io/goodproductsorter)


© 2019 GitHub, Inc.
