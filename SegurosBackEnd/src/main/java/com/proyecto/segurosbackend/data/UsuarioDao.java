/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.data;

import com.proyecto.segurosbackend.logic.Cliente;
import com.proyecto.segurosbackend.logic.Usuario;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author ESCINF
 */
public class UsuarioDao {

    RelDatabase db;

    public UsuarioDao(RelDatabase db) {
        this.db = db;
    }

    public void agregarUsuario(Usuario usuario) throws Exception {
        try {
            String query = "INSERT INTO Usuario(cedula, clave, nombre, telefono, correo, pago, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = db.prepareStatement(query);
            statement.setString(1, usuario.getCedula());
            statement.setString(2, usuario.getClave());
            statement.setString(3, usuario.getNombre());
            statement.setString(4, usuario.getTelefono());
            statement.setString(5, usuario.getCorreo());
            statement.setString(6, usuario.getDatos_tarjeta());
            statement.setInt(7, usuario.getTipo());
            statement.executeUpdate();
        } catch (SQLException ex) {

        }
    }

    public Usuario read(String cedula) throws Exception {
        String sql = "select "
                + "* "
                + "from  Usuario e "
                + "where e.cedula=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, cedula);
        ResultSet rs = db.executeQuery(stm);
        if (rs.next()) {
            return from(rs, "e");
        } else {
            throw new Exception("Empleado no Existe");
        }
    }

    public Usuario from(ResultSet rs, String alias) {
        try {
            Usuario e = new Usuario();
            e.setCedula(rs.getString(alias + ".cedula"));
            e.setClave(rs.getString(alias + ".clave"));
            e.setNombre(rs.getString(alias + ".nombre"));
            e.setTelefono(rs.getString(alias + ".telefono"));
            e.setCorreo(rs.getString(alias + ".correo"));
            e.setDatos_tarjeta(rs.getString(alias + ".pago"));
            e.setTipo(rs.getInt(alias + ".tipo"));
            return e;
        } catch (SQLException ex) {
            return null;
        }
    }

    public void update(Usuario u) throws Exception {
        String sql = "update Usuario set clave=?, nombre=?, telefono=?, correo=?, pago=? where cedula=?";
        PreparedStatement statement = db.prepareStatement(sql);
        statement.setString(1, u.getClave());
        statement.setString(2, u.getNombre());
        statement.setString(3, u.getTelefono());
        statement.setString(4, u.getCorreo());
        statement.setString(5, u.getDatos_tarjeta());
        statement.setString(6, u.getCedula());
        int count = db.executeUpdate(statement);
        if (count == 0) {
            throw new Exception("Usuario no existe");
        }
    }
}
