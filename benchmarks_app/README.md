
![logo](..\images\logos_feder.png)

| Entregable     | Entregable de documentación y aplicación Benchmarks          |
| -------------- | ------------------------------------------------------------ |
| Fecha          | 25/05/2020                                                   |
| Proyecto       | [ASIO](https://www.um.es/web/hercules/proyectos/asio) (Arquitectura Semántica e Infraestructura Ontológica) en el marco de la iniciativa [Hércules](https://www.um.es/web/hercules/) para la Semántica de Datos de Investigación de Universidades que forma parte de [CRUE-TIC](http://www.crue.org/SitePages/ProyectoHercules.aspx) |
| Módulo         | Arquitectura Semántica                                       |
| Tipo           | Software                                                     |
| Objetivo       | El presente documento pretende ser la documentación técnica relativa a el entregable de bechmarks. Para ello, se documentan tanto aspectos relativos al despliegue de la aplicación, como otros aspectos de interés. |
| Estado         | Implementada al **100%**, según la funcionalidad prevista para cubrir lo expresado en el documento [Diseño de benchmark](https://github.com/HerculesCRUE/ib-asio-docs-/blob/master/arquitectura_semantica/benchmark/Dise%C3%B1o%20de%20Bechmark%20proyecto%20ASIO.md). |
| Próximos pasos | En caso de encontrar argumentos de peso para ello, seria posible capturar métricas para otros triple stores |
| Documentación  | [Diseño de benchmark](https://github.com/HerculesCRUE/ib-asio-docs-/blob/master/arquitectura_semantica/benchmark/Dise%C3%B1o%20de%20Bechmark%20proyecto%20ASIO.md) |

# Benchmark y Memoria científico técnica

El presente proyecto, surge de la necesidad de evaluar el mejor sistema de almacenamiento dentro del marco del proyecto Hércules, de la Universidad de Murcia.

El proyecto, consta de varias fases:

## Análisis de  Benchmark existentes 

Para dicha evaluación se han usado como referencia los Benchmarks SPB2, LUBM, BSBM y HOBBIT y los resultado de dicho análisis se recogen en el documento [Diseño de benchmark](https://github.com/HerculesCRUE/ib-asio-docs-/blob/master/arquitectura_semantica/benchmark/Dise%C3%B1o%20de%20Bechmark%20proyecto%20ASIO.md), aunque para las métricas presentes en esta evaluación se han usado únicamente los datos obtenidos para SPB2 y BSBM. Se desecha LUBM, por no encontrar documentación suficiente acerca de los resultados del Benchmark para aplicar las métricas resultantes, y HOBBIT por estar demasiado orientado a Wikibase y por lo tanto no tener la generalidad necesaria para aplicarlo a otros triple stores.

## Benchmark propio

Para el proyecto, se ha generado un Benchmark propio, partiendo de los dataset facilitados por la universidad de Murcia, en primera instancia.

Dado que dichos dataset solo contenían unas 1800  entidades distintas, se ha creado un Script llamado **benchmark_script.ipynb** , por medio de un [Notebook Jupyter](https://jupyter.org/) (Python) un Script que genera usando como semilla los datos "reales" de la universidad de Murcia, varios conjuntos de datos sintéticos en paquetes de **50k, 250k, 500k, 1M y 5M**, hasta ocupar unos 19GB de espacio, motivo por el cual los datos generados no se suben al reposito, pero si pueden ser creados de nuevo al ejecutar el Script.

Por otro lado, el mismo Script realiza inserciones en los Triple Stores seleccionados (por el momento TDB2 y BlazeGraph), y realiza mediciones de tiempos de inserción y de queries sobre los distintos conjuntos de datos antes mencionados.

 Para realizar la inserciones es necesario antes desplegar los Triple Stores, que en este caso se encuentran disponibles en contenedores Docker. Existen ficheros docker-compose-yaml en el directorio docker. Es posible desplegarlo ejecutando el comando:

`docker-compose -f [nombre del fichero docker-compose] up -d`

## Aplicación Web  Benchmark

Para mostrar los resultados de la **Memoria Científico-Técnica** y de los **Benchmarks** se ha desarrollado mediante [Angular](https://angular.io/), una aplicación Web, que tiene la siguientes secciones:

- [Métricas](/metrics): Descripción de todas las  métricas usadas en la aplicación para facilitar la comprensión.
- [Triple Stores](/triple-stores): Ficha de todos los triple stores analizados, con algunos detalles técnicos o de interés.
- [Ajuste de Pesos](/weights): Pesos que se usarán para establecer el criterio de medición para los distintas métricas a analizar. Es posible establecer pesos en todos los niveles jerárquicos, y estos condicionaran el peso final de las métricas individuales. Por ejemplo, es posible establecer pesos distintos para los bloques de **Memoria Científico-Técnica** y  **Benchmarks** y e individualmente para cada uno de los bloques de grupo que contengan y las métricas finales.
- [Memoria Científico-Técnica](/memory): Análisis detallado de todas las métricas, y las puntuaciones finales para cada uno de los triple store analizados, por grupo, y por métrica individual aplicando los pesos definidos para todas las métricas definidas en la Memoria Científico-Técnica. 
- [Benchmarks](/benchmarks): Análisis detallado de todas las métricas, y las puntuaciones finales para cada uno de los triple store analizados, por grupo, y por métrica individual aplicando los pesos definidos para todas las métricas de rendimiento definidas en los Benchmarks de referencia, ya sean propios, ya sean de terceros. Estas métricas ofrecen el KPI de incertidumbre. Dicho KPI, expresa el nivel de incertidumbre para los Triple Store sobre el cual no existe medición de una determinada métrica. la incertidumbre es un valor continuo entre 0 y 1, siendo 0 la ausencia de incertidumbre y 1 la incertidumbre total.  Esta incertidumbre alterara el peso relativo de la  **Memoria Científico-Técnica** y de los **Benchmarks**, dejándolo igual si la incertidumbre es 0, y agregando peso a la Memoria Científico-Técnica en detrimento de el Benchmark en proporción directa a la incertidumbre. 
- [Comparativa](/results): Resultados finales de la **Memoria Científico-Técnica** y de los **Benchmarks**, ofreciendo una puntuación **final**, obtenida a partir de la aplicación e los pesos (con corrección de incertidumbre comentada en el punto anterior).

- [información de interes](/info): La sección presente, que presenta información relativa a la propia aplicación.

La aplicación utiliza datos estáticos de las métricas, triple stores y pesos que son almacenados en [Firebase](https://firebase.google.com/?hl=es-419&gclid=CjwKCAjwqdn1BRBREiwAEbZcR--AmuzsqveCwu9u_zeQvlK08A3_eHAp50tAvvIf72rsYv9OgwSEGhoCjkoQAvD_BwE)

El despliegue de la aplicación WEB se realiza sobre el directorio **benchmarks_app** del proyecto ejecutando el comando 

```
ng serve
```

 a partir de ese momento la aplicación esta disponible en 

http://localhost:4200

![image-20200525074916076](./images/app.png)

También se encuentra desplegada en el entorno de desarrollo de la universidad de Murcia, accesible mediante el siguiente enlace

http://herc-iz-front-desa.atica.um.es:8081/benchmarks

**Nota:** Para acceder desde fuera de la red de la universidad es necesario establecer un túnel ssh

