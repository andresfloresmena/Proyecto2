
package com.proyecto.segurosbackend.logic;

/**
 *
 * @author jimmy
 */
public class Modelo {
    private int id;
    private String nombre;
    private Marca marca;

    public Modelo() {
    }

    public Modelo(int id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    
    }
    
    public Modelo(int id, String nombre, Marca marca) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
    }
    
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }
     
    
}