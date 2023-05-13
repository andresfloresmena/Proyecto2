<%-- 
    Document   : View
    Created on : Apr 17, 2023, 11:10:39 PM
    Author     : jimmy
--%>

<%@page import="com.progra.guia.logic.Categoria"%>
<%@page import="com.progra.guia.logic.Cobertura"%>
<%@page import="com.progra.guia.presentation.administrador.categorias.Model"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>


<%
    Model model = (Model) request.getAttribute("model");
    List<Categoria> categorias = model.getCategorias();
%>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <%@ include file="/presentation/Head.jsp" %>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Administrador - Gestión de Categorías y Coberturas</title>
        <!-- Agregar CSS de Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>

        <div class="container">
            <h1 class="mb-4">Administrador - Gestión de Categorías y Coberturas</h1>


            <div class="header-container2">
                <h2>Listado de categorías y coberturas</h2>
                <button class="btn btn-info">
                    <a href="/GuiaDB/presentation/administrador/menu/View.jsp" style="text-decoration: none;">Volver al Menu</a>
                </button>
            </div>


            <table class="table table-hover table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>ID Categoría</th>
                        <th>Descripción</th>
                        <th>Coberturas específicas</th>
                    </tr>
                </thead>
                <tbody>
                    <% for (Categoria categoria : categorias) { %>
                    <tr>
                        <td class="text-center align-middle"><%= categoria.getId() %></td>
                        <td class="text-center align-middle"><%= categoria.getDescripcion() %></td>
                        <td>
                            <table class="table table-hover table-bordered table-sm">
                                <thead class="table-light">
                                    <tr>
                                        <th>ID Cobertura</th>
                                        <th>Descripción</th>
                                        <th>Costo mínimo</th>
                                        <th>Costo porcentual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% for (Cobertura cobertura : categoria.getCoberturas()) { %>
                                    <tr>
                                        <td><%= cobertura.getId() %></td>
                                        <td><%= cobertura.getDescripcion() %></td>
                                        <td>₡<%= cobertura.getCostoMinimo() %></td>
                                        <td><%= cobertura.getCostoPorcentual() %> %</td>
                                    </tr>
                                    <% } %>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <% } %>
                </tbody>
            </table>


            <h2 class="mb-3">Agregar nueva categoría</h2>
            <form action="presentation/administrador/categorias/agregarCategoria" method="post">
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripcion de la categoría</label>
                    <input type="text" class="form-control" id="descripcion" name="descripcion" required>
                </div>
                <button type="submit" class="btn btn-primary mb-4">Agregar categoría</button>
            </form>

            <h2 class="mb-3">Agregar nueva cobertura</h2>
            <form action="presentation/administrador/categorias/agregarCobertura" method="post">
                <div class="mb-3">
                    <label for="categoria" class="form-label">Categoría</label>
                    <select class="form-select" id="categoria" name="categoria" required>

                        <% for (Categoria categoria : categorias) { %>
                        <option value="<%= categoria.getId() %>"><%= categoria.getDescripcion() %></option>
                        <% } %>

                    </select>
                </div>
                <div class="mb-3">
                    <label for="nombreCobertura" class="form-label">Nombre de la cobertura</label>
                    <input type="text" class="form-control" id="nombreCobertura" name="nombreCobertura" required>
                </div>
                <div class="mb-3">
                    <label for="costoMinimo" class="form-label">Costo mínimo</label>
                    <input type="number" step="0.01" class="form-control" id="costoMinimo" name="costoMinimo" required>
                </div>
                <div class="mb-3">
                    <label for="costoPorcentual" class="form-label">Costo porcentual</label>
                    <input type="number" step="0.01" class="form-control" id="costoPorcentual" name="costoPorcentual" required>
                </div>
                <button type="submit" class="btn btn-primary mb-4">Agregar cobertura</button>
            </form>



        </div>
        <div class="mt-5">
            <%@ include file="/presentation/Footer.jsp" %>
        </div>  
    </body>
</html>

