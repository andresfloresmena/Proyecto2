<%@page import="com.progra.guia.presentation.cliente.datos.Model"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head> 
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="../../../css/style.css"/>
        <%@ include file="/presentation/Head.jsp" %>
        <title>Actualizar Datos</title>
    </head>
    <body >

        <%@ include file="/presentation/Header.jsp" %>

        <% Model model= (Model) request.getAttribute("model"); %>
        <% Map<String,String> errores = (Map<String,String>) request.getAttribute("errores"); %>
        <% Map<String,String[]> form = (errores==null)?this.getForm(model):request.getParameterMap();%>


        <form method="post" action="presentation/cliente/datos/update" class="form-horizontal form_datos">
            
            <div class="form-group">
                <label class="col-sm-3 control-label">Cedula</label>
                <div class="col-sm-9">
                    <input type="text" name="cedulaFld" class="form-control" value="<%=model.getCurrent().getCedula()%>" readonly>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-3 control-label">Nombre:</label>
                <div class="col-sm-9">
                    <input type="text" name="nombreFld" value="<%=form.get("nombreFld")[0]%>" placeholder="Nombre del usuario" class="form-control" required>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-3 control-label">Teléfono:</label>
                <div class="col-sm-9">
                    <input type="tel" name="telefono" value="<%=model.getCurrent().getUsuario().getTelefono()%>" class="form-control" required>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-3 control-label">Correo electrónico:</label>
                <div class="col-sm-9">
                    <input type="email" name="correo" value="<%=model.getCurrent().getUsuario().getCorreo()%>" class="form-control" required>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-3 control-label">Número de tarjeta:</label>
                <div class="col-sm-9">
                    <input type="text" name="tarjeta" value="<%=model.getCurrent().getUsuario().getDatos_tarjeta()%>" class="form-control" required>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-3 control-label">Clave:</label>
                <div class="col-sm-9">
                    <input type="password" name="clave" value="<%=model.getCurrent().getUsuario().getClave()%>" class="form-control" required>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
                    <button type="submit" class="btn btn-primary">Actualizar</button>
                </div>
            </div>

        </form>
        <%@ include file="/presentation/Footer.jsp" %>                  
    </body>
</html>
<%!
    private String erroneo(String campo, Map<String,String> errores){
      if ( (errores!=null) && (errores.get(campo)!=null) )
        return "is-invalid";
      else
        return "";
    }

    private String title(String campo, Map<String,String> errores){
      if ( (errores!=null) && (errores.get(campo)!=null) )
        return errores.get(campo);
      else
        return "";
    }

    private Map<String,String[]> getForm(Model model){
       Map<String,String[]> values = new HashMap<>();
       values.put("cedulaFld", new String[]{model.getCurrent().getCedula()});
       values.put("nombreFld", new String[]{model.getCurrent().getNombre()});
       return values;
    }
    
%> 