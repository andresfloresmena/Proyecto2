
package com.proyecto.segurosbackend.data;

/**
 *
 * @author jimmy
 */
import com.proyecto.segurosbackend.logic.Marca;
import com.proyecto.segurosbackend.logic.Modelo;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MarcaDao {

    RelDatabase db;

    public MarcaDao(RelDatabase db) {
        this.db = db;
    }

    public Marca read(int id) throws Exception {
        String sql = "SELECT * FROM Marca WHERE id = ?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, id);
        ResultSet rs = db.executeQuery(stm);
        Marca marca;
        if (rs.next()) {
            marca = from(rs, "Marca");
            return marca;
        } else {
            throw new Exception("Marca no existe");
        }
    }

    public Marca from(ResultSet rs, String alias) {
        try {
            Marca marca = new Marca();
            marca.setId(rs.getInt(alias + ".id_marca"));
            marca.setNombre(rs.getString(alias + ".nombre_marca"));

            return marca;
        } catch (SQLException ex) {
            return null;
        }
    }

    public List<Marca> obtenerTodosLasCategorias() {
        List<Marca> marcas = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Marca m";
            PreparedStatement stm = db.prepareStatement(sql);
            ResultSet rs = stm.executeQuery(sql);

            while (rs.next()) {
                Marca marca = from(rs, "m");
                marca.setModelos(obtenerModelosPorMarcaId(marca.getId()));
                marcas.add(marca);
            }
        } catch (SQLException ex) {

        }
        return marcas;
    }

    private List<Modelo> obtenerModelosPorMarcaId(int marcaId) {
        List<Modelo> modelos = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Modelo m WHERE m.id_marca = ?";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setInt(1, marcaId);
            ResultSet rs = db.executeQuery(stm);

            while (rs.next()) {
                Modelo modelo = fromModelo(rs, "m");
                modelos.add(modelo);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return modelos;
    }

    private Modelo fromModelo(ResultSet rs, String prefix) throws SQLException {
        int idModelo = rs.getInt(prefix + ".id_modelo");
        String nombreModelo = rs.getString(prefix + ".nombre_modelo");

        Modelo modelo = new Modelo(idModelo, nombreModelo);
        return modelo;
    }

    public void agregarMarca(Marca marca) throws SQLException {
        try {
            String query = "INSERT INTO Marca (nombre_marca) VALUES (?)";
            PreparedStatement statement = db.prepareStatement(query);
            statement.setString(1, marca.getNombre());
            statement.executeUpdate();
        } catch (SQLException ex) {

        }

    }

    public void agregarModeloAMarca(Modelo modelo, int marcaId) throws SQLException {
        String sql = "INSERT INTO Modelo (nombre_modelo, id_marca) VALUES (?, ?)";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, modelo.getNombre());
        stm.setInt(2, marcaId);
        int count = stm.executeUpdate();
        if (count == 0) {
            throw new SQLException("Error al insertar modelo a la marca");
        }

    }

    public Integer buscarModelo(Modelo modelo, int marcaId) throws SQLException {
        int modeloId = -1; // Inicializa el modeloId con un valor no válido

        try {
            String sql = "SELECT id_modelo FROM Modelo m WHERE m.nombre_modelo = ? AND m.id_marca = ?";

            PreparedStatement stm = db.prepareStatement(sql);
            stm.setString(1, modelo.getNombre());
            stm.setInt(2, marcaId);
            ResultSet resultSet = stm.executeQuery();

            if (resultSet.next()) {
                modeloId = resultSet.getInt("id_modelo");
            }

        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        return modeloId;
    }

    public Integer buscarModelo2(String nombreModelo) throws SQLException {
        int modeloId = -1; // Inicializa el modeloId con un valor no válido

        try {
            String sql = "SELECT id_modelo FROM Modelo m WHERE m.nombre_modelo = ?";

            PreparedStatement stm = db.prepareStatement(sql);
            stm.setString(1, nombreModelo);
            ResultSet resultSet = stm.executeQuery();

            if (resultSet.next()) {
                modeloId = resultSet.getInt("id_modelo");
            }

        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        return modeloId;
    }

}
