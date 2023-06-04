
package com.proyecto.segurosbackend.data;

/**
 *
 * @author jimmy
 */
import com.proyecto.segurosbackend.logic.Categoria;
import com.proyecto.segurosbackend.logic.Cobertura;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CategoriaDao {

    RelDatabase db;

    public CategoriaDao(RelDatabase db) {
        this.db = db;
    }

    public Categoria read(int id) throws Exception {
        String sql = "SELECT * FROM Categoria WHERE id=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, id);
        ResultSet rs = db.executeQuery(stm);
        if (rs.next()) {
            return from(rs, "Categoria");
        } else {
            throw new Exception("Categoría no existe");
        }
    }

    public Categoria from(ResultSet rs, String alias) {
        try {
            Categoria c = new Categoria();
            c.setId(rs.getInt(alias + ".id"));
            c.setDescripcion(rs.getString(alias + ".descripcion"));
            return c;
        } catch (SQLException ex) {
            return null;
        }
    }

    public List<Categoria> obtenerTodasLasCategorias() {
        List<Categoria> categorias = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Categoria c";
            PreparedStatement stm = db.prepareStatement(sql);
            ResultSet rs = db.executeQuery(stm);

            while (rs.next()) {
                Categoria categoria = from(rs, "c");
                categoria.setCoberturas(obtenerCoberturasPorCategoriaId(categoria.getId()));
                categorias.add(categoria);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return categorias;
    }

    private List<Cobertura> obtenerCoberturasPorCategoriaId(int categoriaId) {
        List<Cobertura> coberturas = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Cobertura c WHERE c.categoria_id = ?";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setInt(1, categoriaId);
            ResultSet rs = db.executeQuery(stm);

            while (rs.next()) {
                Cobertura cobertura = fromCobertura(rs, "c");
                coberturas.add(cobertura);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return coberturas;
    }

    public Cobertura fromCobertura(ResultSet rs, String prefix) throws SQLException {
        Cobertura cobertura = new Cobertura();
        cobertura.setId(rs.getInt(prefix + ".id"));
        cobertura.setDescripcion(rs.getString(prefix + ".descripcion"));
        cobertura.setCostoMinimo(rs.getDouble(prefix + ".costo_minimo"));
        cobertura.setCostoPorcentual(rs.getDouble(prefix + ".costo_porcentual"));

        return cobertura;
    }

    public void agregarCategoria(Categoria categoria) {
        try {
            String query = "INSERT INTO Categoria(descripcion) VALUES (?)";
            PreparedStatement statement = db.prepareStatement(query);
            statement.setString(1, categoria.getDescripcion());
            statement.executeUpdate();
        } catch (SQLException ex) {

        }
    }

    public void agregarCobertura(int idCategoria, Cobertura cobertura) throws Exception {
        Categoria categoria = read(idCategoria);
        List<Cobertura> coberturas = categoria.getCoberturas();
        if (coberturas == null) {
            coberturas = new ArrayList<>();
        }
        coberturas.add(cobertura);

        try {
            String sql = "INSERT INTO Cobertura (categoria_id, descripcion, costo_minimo, costo_porcentual) VALUES (?, ?, ?, ?)";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setInt(1, idCategoria);
            stm.setString(2, cobertura.getDescripcion());
            stm.setDouble(3, cobertura.getCostoMinimo());
            stm.setDouble(4, cobertura.getCostoPorcentual());
            stm.executeUpdate();
        } catch (SQLException ex) {

        }

    }

}
