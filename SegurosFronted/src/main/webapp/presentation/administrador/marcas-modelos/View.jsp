<%-- 
    Document   : View
    Created on : Apr 17, 2023, 10:35:55 PM
    Author     : jimmy
--%>

<%@page import="com.progra.guia.logic.Marca "%>
<%@page import="com.progra.guia.logic.Modelo "%>
<%@page import="com.progra.guia.presentation.administrador.autos.Model"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    Model model = (Model) request.getAttribute("model");
    List<Marca> marcas = model.getAutos();
%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <%@ include file="/presentation/Head.jsp" %>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Gestión de Marcas y Modelos de Autos</title>
        <!-- Agregar CSS de Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>

        <div class="container mb-3">
            <h1 class="mb-4">Administrador - Gestión de Marcas y Modelos</h1>

            <div class="header-container2">
                <h2>Listado de Marcas y Modelos</h2>
                <button class="btn btn-info">
                    <a href="/GuiaDB/presentation/administrador/menu/View.jsp" style="text-decoration: none;">Volver al Menu</a>
                </button>
            </div>
            <table class="table table-hover table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>N°</th>
                        <th>Marca</th>
                        <th>Modelos</th>
                    </tr>
                </thead>
                <tbody>
                    <% int rowNumber = 1;
                       for (Marca marca : marcas) {
                           List<Modelo> modelos = marca.getModelos(); %>
                    <tr>
                        <td class="text-center align-middle"><%= rowNumber++ %></td>
                        <td class="text-center align-middle"><%= marca.getNombre() %></td>
                        <td>
                            <ul>
                                <% for (Modelo modelo : modelos) { %>
                                <li class="mb-1">
                                    <%= modelo.getNombre() %>
                                    <img src="presentation/administrador/autos/getImagen?id=<%= modelo.getId() %>" alt="<%= modelo.getId() %>" style="width: 50px; height: 50px;">
                                </li>
                                <% } %>
                            </ul>
                        </td>
                    </tr>
                    <% } %>
                </tbody>
            </table>





            <h2 class="my-4">Agregar nueva Marca</h2>
            <form action="presentation/administrador/autos/agregarMarca" method="post" class="mb-3">
                <div class="mb-3">
                    <label for="nombreMarca" class="form-label">Marca:</label>
                    <input type="text" class="form-control" id="nombreMarca" name="nombreMarca" required>
                </div>

                <button type="submit" class="btn btn-primary mb-4">Agregar marca</button>
            </form>

            <h2 class="my-4">Agregar nuevo Modelo</h2>
            <form action="presentation/administrador/autos/agregarModelo" method="post" class="mb-3" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="marca" class="form-label">Marca:</label>
                    <select name="marca" id="marca" class="form-control">
                        <option value="">Seleccione una marca</option>

                        <% for (Marca marca : marcas) { %>
                        <option value="<%= marca.getId() %>"><%= marca.getNombre() %></option>
                        <% } %>

                    </select>
                </div>

                <div class="mb-3">
                    <label for="nuevoModelo" class="form-label">Modelo:</label>
                    <input type="text" class="form-control" id="nuevoModelo" name="nuevoModelo" required>
                </div>
                <div class="mb-3">
                    <label for="imagen" class="form-label">Imagen:</label>                   
                    <input type="file" name="imagen" id="imagen" class="form-control" required>
                </div>
            
                <button type="submit" class="btn btn-primary mb-4">Agregar modelo</button>
            </form>


        </div>
        <div class="mt-5">
            <%@ include file="/presentation/Footer.jsp" %>
        </div>                

    </body>
</html>

