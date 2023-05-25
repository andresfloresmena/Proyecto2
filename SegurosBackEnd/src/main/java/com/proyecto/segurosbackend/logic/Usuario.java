package com.proyecto.segurosbackend.logic;

import java.util.Objects;

public class Usuario  implements java.io.Serializable {


     private String cedula;
     private String clave;
     private String nombre;
     private String telefono;
     private String correo;
     private String datos_tarjeta;
     private Integer tipo;
     private String rol;

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDatos_tarjeta() {
        return datos_tarjeta;
    }

    public void setDatos_tarjeta(String datos_tarjeta) {
        this.datos_tarjeta = datos_tarjeta;
    }


    public Usuario(String cedula, String clave, String nombre, String telefono, String correo, String datos_tarjeta) {
        this.cedula = cedula;
        this.clave = clave;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.datos_tarjeta = datos_tarjeta;
    }
     
    public Usuario() {
    }

    public Usuario(String cedula) {
        this.cedula = cedula;
    }
   
    public String getCedula() {
        return this.cedula;
    }
    
    public void setCedula(String cedula) {
        this.cedula = cedula;
    }
    public String getClave() {
        return this.clave;
    }
    
    public void setClave(String clave) {
        this.clave = clave;
    }
    public Integer getTipo() {
        return this.tipo;
    }
    
    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Usuario other = (Usuario) obj;
        if (!Objects.equals(this.cedula, other.cedula)) {
            return false;
        }
        return true;
    }
    
    

}


