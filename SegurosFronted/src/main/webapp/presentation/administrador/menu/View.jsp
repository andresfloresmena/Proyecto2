<%-- 
    Document   : View
    Created on : Apr 17, 2023, 10:30:14 PM
    Author     : jimmy
--%>


<!-- admin-menu.jsp -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="../../../css/normalize.css"/>
        <link rel="stylesheet" href="../../../css/style.css"/>
        <link rel="stylesheet" href="../../../css/menu.css"/>
        <%@ include file="/presentation/Head.jsp" %>
        <title>Administrador - Menú</title>
        <!-- Agregar CSS de Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            .list-group-item {
                color: #ffffff; 
                background-color: #6A9AE2; 
            }

            .list-group-item:hover {
                color: #ffffff; 
                background-color: #A3C0F3; 
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div class="container">
            <h1 class="my-4">Administrador - Menú</h1>
            <div class="list-group">
                <a href="/GuiaDB/presentation/administrador/clientes/show" class="list-group-item list-group-item-action">
                    Administración de clientes y pólizas
                </a>
                <a href="/GuiaDB/presentation/administrador/autos/show" class="list-group-item list-group-item-action">
                    Administración de marcas y modelos de autos
                </a>
                <a href="/GuiaDB/presentation/administrador/categorias/show" class="list-group-item list-group-item-action">
                    Administración de categorías y coberturas
                </a>
            </div>
        </div>

        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>
