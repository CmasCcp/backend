<style>
  body {
    background-color: #333; /* Un tono de gris muy oscuro */
    color: white; /* Texto en blanco para contrastar con el fondo oscuro */
    font-family: arial;
    padding-right: 50px;
    padding-left: 50px;
    padding-top: 50px;
  }
</style>
# Documentación API C+ Concepción
En la presente documentación se detalla la funcionalidad asociada a cada ruta de la api.

## getProjects

La ruta `getProjects` se utiliza para obtener una lista de todos los proyectos y su data. A continuación, se muestran los detalles de esta solicitud:

### Solicitud

- Método: GET
- URL: `http://superusuario.cl/api/projects`

### Respuesta

La respuesta contendrá un arreglo como este: 
```
  [
    {
      "name": "[FIC] Calidad de Agua en Riego",
      "img": "url_imagen.com",
      "table_name": "fic_calidad_agua",
      "category": "FIC",
      "data": [{},{},{}]
    },
    {
      "name": "[FIC] Riego",
      "img": "url_imagen.com",
      "table_name": "fic_riego",
      "category": "FIC",
      "data": [{},{},{}]
    }
  ]
```
## getProjectsDataless

La ruta `getProjectsDataless` es similar a `getProjects`, pero devuelve una lista de proyectos con la propiedad "data" con un arreglo vacio [].

### Solicitud

- Método: GET
- URL: `http://superusuario.cl/api/projects/dataless`


### Respuesta

La respuesta contendrá una lista de proyectos con datos mínimos.
```
  [
    {
      "name": "[FIC] Calidad de Agua en Riego",
      "img": "url_imagen.com",
      "table_name": "fic_calidad_agua",
      "category": "FIC",
      "data": []
    },
    {
      "name": "[FIC] Riego",
      "img": "url_imagen.com",
      "table_name": "fic_riego",
      "category": "FIC",
      "data": []
    }
  ]
```

## getOneProject

La ruta `getOneProject` se utiliza para obtener únicamente la información de un proyecto específico.

### Solicitud

- Método: GET
- URL: `http://superusuario.cl/api/projects/:tablename`

### Variables de url

- `tablename` (Requerido) - nombre de la tabla que contiene la data del proyecto.

### Respuesta

La respuesta contendrá los detalles completos del proyecto especificado.

Ejemplo con `http://superusuario.cl/api/projects/fic_calidad_agua`

```
  [
    {
      "name": "[FIC] Calidad de Agua en Riego",
      "img": "url_imagen.com",
      "table_name": "fic_calidad_agua",
      "category": "FIC",
      "data": [{...},{...},{...}]
    }
  ]
```

## Get tracker

Trae la información de la tabla fic_tracker que tengan la patente que se indica en la url.

De no especificar el número de patente, se traerán todos los datos.

### Solicitud

- Método: GET
- URL: `http://superusuario.cl/api/projects/get/tracker/?patent=123`

### Query params

- `patent` (opcional) - número de patente del tracker

### Respuesta

```
  [
     {
        "id": 47,
        "timestamp": "2023-10-04T21:01:26.000Z",
        "lat": "123",
        "lon": "123",
        "pat": "123",
        "batt": 123
    },
    {},
    {}
  ]
```

## Post tracker

Envia información a la tabla fic_tracker.

### Solicitud

- Método: GET
- URL: `http://superusuario.cl/api/projects/post/tracker/?lat=0&lon=0&pat=0&batt=0`

### Query params

- `lat` (?) - número de latitud del tracker
- `lon` (?) - número de longitud(? del tracker
- `pat` (?) - número de patente del tracker
- `batt` (?) - número de ??? del tracker

### Respuesta

```
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 49,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}
```
