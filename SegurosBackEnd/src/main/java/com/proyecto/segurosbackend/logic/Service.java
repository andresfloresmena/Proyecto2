/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.proyecto.segurosbackend.logic;

import com.proyecto.segurosbackend.data.ClienteDao;
import com.proyecto.segurosbackend.data.PolizaDao;
import com.proyecto.segurosbackend.data.RelDatabase;
import com.proyecto.segurosbackend.data.UsuarioDao;
import java.util.List;
import com.proyecto.segurosbackend.data.MarcaDao;
import com.proyecto.segurosbackend.data.CategoriaDao;
import com.proyecto.segurosbackend.data.PolizaCoberturaDao;


/**
 *
 * @author Escinf
 */
public class Service {
    private static Service uniqueInstance;
    
    public static Service instance(){
        if (uniqueInstance == null){
            uniqueInstance = new Service();
        }
        return uniqueInstance; 
    }
    RelDatabase relDatabase;
    UsuarioDao usuarioDao;
    ClienteDao clienteDao;
    PolizaDao polizaDao;
    
    MarcaDao marcaDao;
    CategoriaDao categoriaDao;
    PolizaCoberturaDao poliCoDao;
//    HashMap<String,Usuario> usuarios;
//    HashMap<String,Cliente> clientes;
//    HashMap<String,Poliza> polizas;
//    HashMap<String,List<String>> favoritas;
//    
    
    private Service(){
        relDatabase = new RelDatabase();
        usuarioDao = new UsuarioDao(relDatabase);
        clienteDao = new ClienteDao(relDatabase);
        polizaDao = new PolizaDao(relDatabase);
        
        marcaDao = new MarcaDao(relDatabase);
        categoriaDao = new CategoriaDao(relDatabase);
        poliCoDao = new PolizaCoberturaDao(relDatabase);
       
    }

    public Usuario usuarioFind(String cedula,String clave){
        try {
        // Obtenemos el objeto Usuario mediante la cédula ingresada
        Usuario usuario = usuarioDao.read(cedula);
        if(usuario != null) {
            // Verificamos que la clave ingresada sea igual a la clave almacenada en el objeto Usuario
            if(clave.equals(usuario.getClave())) {
                return usuario;
            } else {
                // Si las claves no coinciden, devolvemos null
                return null;
            }
        } else {
            // Si el objeto Usuario es nulo, devolvemos null
            return null;
        }
    } catch (Exception ex) {
        ex.printStackTrace();
    }
    return null;
    }

    public Cliente clienteFind(Usuario usuario){
        try{
            return clienteDao.read(usuario.getCedula());
        }catch(Exception ex){
            return null;
        }
    }
    
    public void registrarUsuario(Usuario usuario)throws Exception{
        // Aquí se llama al método agregarUsuario de la clase UsuarioDao
        usuarioDao.agregarUsuario(usuario);
    }
    
    
    public List<Poliza> polizaFind(Cliente cliente) throws Exception{
        List<Poliza> polizas = polizaDao.findByCliente(cliente.getCedula());
        for(Poliza e:polizas) e.setCliente(cliente);
        cliente.setPolizas(polizas);
        return polizas;
    }

    public void clienteUpdate(Cliente cliente) throws Exception{
        clienteDao.update(cliente);
        usuarioDao.update(cliente.getUsuario());
    }
    
    public void agregarCliente(Cliente cliente) throws Exception{
        registrarUsuario(cliente.getUsuario());
        clienteDao.agregarCliente(cliente);
    }
    
    public Poliza polizaFind(String numero) throws Exception{
        return polizaDao.read(numero);
    }
    
    public Poliza polizaFindById(String id) throws Exception{
        return polizaDao.findById(id);
    }
    
    public List<Poliza> polizaFindByUsuario(Usuario usuario){
        List<Poliza> polizas = polizaDao.findByCliente(usuario.getCedula());
        return polizas;
    }
    
    public List<Cliente> allClientes() throws Exception{
        return clienteDao.obtenerTodosLosClientes();
    }

    public Usuario usuarioFindByCedula(String cedula){
        try{
            return usuarioDao.read(cedula);
        }catch(Exception ex){ex.printStackTrace();}
        return null;
    }
    
    
    public List<Marca> allAutos() throws Exception{
        return marcaDao.obtenerTodosLasCategorias();
    }
    
    public void agregarAuto(Marca auto) throws Exception{
        marcaDao.agregarMarca(auto);
    }
    
    public void agregarModelo(Modelo modelo, int marca) throws Exception{
        marcaDao.agregarModeloAMarca(modelo, marca);
    }
    
    
    public void agregarCobertura(int id, Cobertura cobertura ) throws Exception{
        categoriaDao.agregarCobertura(id, cobertura);
    }
    
    public List<Categoria> allCategorias() throws Exception{
        return categoriaDao.obtenerTodasLasCategorias();
    }
    
    public void agregarCategoria(Categoria categoria) throws Exception{
        categoriaDao.agregarCategoria(categoria);
    }

    public List<Poliza> polizaFindByPlaca(String placa, String cedula) {
        return polizaDao.findByPlaca(placa, cedula);
    }

    public void agregarPoliza(Poliza poliza) {
        polizaDao.agregarPoliza(poliza);
    }
    
    public Integer codigoModelo(Modelo modelo, int marca) throws Exception{
        return marcaDao.buscarModelo(modelo, marca);
    }
    
    public void unirPolizaCobertura(int poliza, List<Integer> coberturas) throws Exception{
        poliCoDao.agregarPolizaCobertura(poliza, coberturas);
    }
    
            
    public List<Cobertura> coberturaPoliza(int poliza) throws Exception{
        return poliCoDao.obtenerCoberturasPorIdPoliza(poliza);
    }
    
     public int findIdPoliza(Poliza poliza) throws Exception{
        return polizaDao.buscarIdPoliza(poliza);
    }
     
    public int buscarIdModelo2(String modelo) throws Exception {
        return marcaDao.buscarModelo2(modelo);
    }
    
}
