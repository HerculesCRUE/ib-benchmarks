![](./images/logos_feder.png)

| Documento | [Métricas FAIR](README.md) - Manual de usuario               |
| --------- | ------------------------------------------------------------ |
| Fecha     | 25/05/2020                                                   |
| Proyecto  | [ASIO](https://www.um.es/web/hercules/proyectos/asio) (Arquitectura Semántica e Infraestructura Ontológica) en el marco de la iniciativa [Hércules](https://www.um.es/web/hercules/) para la Semántica de Datos de Investigación de Universidades que forma parte de [CRUE-TIC](http://www.crue.org/SitePages/ProyectoHercules.aspx) |
| Módulo    | Arquitectura Semántica                                       |
| Tipo      | Manual de usuario                                            |

# Métricas FAIR - Manual de usuario

El presente documento describe en detalle el proceso de **ejecución y uso** tanto del software de visualización (**benchmarks_app**) como del software de generación de datos (**benchmark_script.ipynb**).

## Análisis de  Benchmark existentes

El script `benchmark_script.ipynb` se encarga de generar a partir de datos reales del proyecto, datos sintéticos, de forma que sea posible evaluar el rendimiento de distintos Triple Stores, con grandes volúmenes de datos.

Los detalles necesarios para ejecutar dicho Script podemos verlos en el [manual de despliegue](manual_despliegue.md) y la funcionalidad de dicho Script esta descrita en el [Manual Tecnico](manual_tecnico.md).

Los volúmenes de datos a generar, son configurables por el usuario. La constante **dataNumber** es una lista que define los volúmenes de datos para los que generaremos métricas

```bash
dataNumber = [50000,250000,500000,1000000,5000000] # volumen de paquetes de datos
```

Existen algunas variables de control, que determinan si se ejecutan secciones del Script, entre ellas:

```bash
GENERATE_NEW_DATA = True # determina si se crean datos sinteticos nuevos o se usan los existentes 
GENERATE_NEW_TDB2_MEAUSERES = True # determina si se generan nuevas métricas para TDB
GENERATE_NEW_BLAZEGRAPH_MEAUSERES = True # determina si se generan nuevas métricas para BlazeGraph
```

También es posible personalizar las Queries, cambiando el siguiente contenido por el que se considere oportuno



```python
Q1 = """PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

DESCRIBE <http://hercules.org/um/es-ES/rec/AnualidadFinanciacionRegistroAyudaDefinitiva/e73fc9ee-382e-4a83-b9d5-58d3c45c5d81>"""

Q1_N = """
DESCRIBE <http://hercules.org/um/es-ES/rec/AnualidadFinanciacionRegistroAyudaDefinitiva/e73fc9ee-382e-4a83-b9d5-58d3c45c5d81>"""


# COUNT: Contar el numero de tripletas
Q2 = """PREFIX un: <http://www.w3.org/2007/ont/unit#>
PREFIX uni: <http://purl.org/weso/uni/uni.html#>
prefix univ:<http://people.brunel.ac.uk/~csstnns/university.owl#>
prefix sp:<http://www.meta-qsar.org/ontologies/sport.owl#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT (COUNT(*) as ?Triples) WHERE { ?s ?p ?o}"""

Q2_N = """SELECT (COUNT(*) as ?Triples) WHERE { ?s ?p ?o}"""

# FILTER: WHERE idPersona = 2211
Q3 = """PREFIX un: <http://www.w3.org/2007/ont/unit#>
PREFIX uni: <http://purl.org/weso/uni/uni.html#>
prefix univ:<http://people.brunel.ac.uk/~csstnns/university.owl#>
prefix sp:<http://www.meta-qsar.org/ontologies/sport.owl#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?s ?p ?o
WHERE {
  ?s <http://hercules.org/um/es-ES/rec/idPersona> ?o
  FILTER(?o = "2211")
}"""

Q3_N = """SELECT ?s ?p ?o
WHERE {
  ?s <http://hercules.org/um/es-ES/rec/idPersona> ?o
  FILTER(?o = "2211")
}"""

# DISTINCT: Personas distintas
Q4 = """PREFIX un: <http://www.w3.org/2007/ont/unit#>
PREFIX uni: <http://purl.org/weso/uni/uni.html#>
prefix univ:<http://people.brunel.ac.uk/~csstnns/university.owl#>
prefix sp:<http://www.meta-qsar.org/ontologies/sport.owl#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?o WHERE { ?s <http://hercules.org/um/es-ES/rec/idPersona> ?o }"""

Q4_N = """SELECT DISTINCT ?o WHERE { ?s <http://hercules.org/um/es-ES/rec/idPersona> ?o }"""


queries = [Q1,Q2,Q3,Q4] # Queries a ejecutar

queries_no_prefix = [Q1_N,Q2_N,Q3_N,Q4_N] # Queries a ejecutar
```

Donde las queries con el sufijo _N son queries sin prefijo. En cualquier caso, las queries que se ejecutarán son las que quedan en las listas queries o queries_no_prefix (según el Enpoint SPARQL aceptara unas u otras).

El resultado de la ejecución del Script, será nuevas métricas almacenadas en Firebase, que serán consumidas por la aplicación benchmarks_app, en la sección, Benchmarks propios. 

## Aplicación Benchmarks APP

Para mostrar los resultados de la **Memoria Científico-Técnica** y de los **Benchmarks** se ha desarrollado mediante [Angular](https://angular.io/), una aplicación Web, que tiene la siguientes secciones:

- **Métricas**: Descripción de todas las  métricas usadas en la aplicación para facilitar la comprensión.
- **Triple Stores**: Ficha de todos los triple stores analizados, con algunos detalles técnicos o de interés.
- **Ajuste de Pesos:** Pesos que se usarán para establecer el criterio de medición para los distintas métricas a analizar. Es posible establecer pesos en todos los niveles jerárquicos, y estos condicionaran el peso final de las métricas individuales. Por ejemplo, es posible establecer pesos distintos para los bloques de **Memoria Científico-Técnica** y  **Benchmarks** y e individualmente para cada uno de los bloques de grupo que contengan y las métricas finales.
- **Memoria Científico-Técnica:** Análisis detallado de todas las métricas, y las puntuaciones finales para cada uno de los triple store analizados, por grupo, y por métrica individual aplicando los pesos definidos para todas las métricas definidas en la Memoria Científico-Técnica. 
- **Benchmarks:** Análisis detallado de todas las métricas, y las puntuaciones finales para cada uno de los triple store analizados, por grupo, y por métrica individual aplicando los pesos definidos para todas las métricas de rendimiento definidas en los Benchmarks de referencia, ya sean propios, ya sean de terceros. Estas métricas ofrecen el KPI de incertidumbre. Dicho KPI, expresa el nivel de incertidumbre para los Triple Store sobre el cual no existe medición de una determinada métrica. la incertidumbre es un valor continuo entre 0 y 1, siendo 0 la ausencia de incertidumbre y 1 la incertidumbre total.  Esta incertidumbre alterara el peso relativo de la  **Memoria Científico-Técnica** y de los **Benchmarks**, dejándolo igual si la incertidumbre es 0, y agregando peso a la Memoria Científico-Técnica en detrimento de el Benchmark en proporción directa a la incertidumbre. 
- **Comparativa**: Resultados finales de la **Memoria Científico-Técnica** y de los **Benchmarks**, ofreciendo una puntuación **final**, obtenida a partir de la aplicación e los pesos (con corrección de incertidumbre comentada en el punto anterior).

- **información de interés**: La sección presente, que presenta información relativa a la propia aplicación.

La aplicación utiliza datos estáticos de las métricas, triple stores y pesos que son almacenados en [Firebase](https://firebase.google.com/?hl=es-419&gclid=CjwKCAjwqdn1BRBREiwAEbZcR--AmuzsqveCwu9u_zeQvlK08A3_eHAp50tAvvIf72rsYv9OgwSEGhoCjkoQAvD_BwE)

El despliegue de la aplicación WEB se realiza sobre el directorio **benchmarks_app** del proyecto ejecutando el comando 

```
ng serve
```

 a partir de ese momento la aplicación esta disponible en 

http://localhost:4200

![image-20200525074916076](C:/Users/druiz/repositorios/UM/benchmarks/images/app.png)

También se encuentra desplegada en el entorno de desarrollo de la universidad de Murcia, accesible mediante el siguiente enlace

http://herc-iz-front-desa.atica.um.es:8081/benchmarks

**Nota:** Para acceder desde fuera de la red de la universidad es necesario establecer un túnel ssh

