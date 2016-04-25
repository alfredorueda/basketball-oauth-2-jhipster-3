package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.PosicionesJugadores;

/**
 * A Player.
 */
@Entity
@Table(name = "player")
public class Player implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Min(value = 0)
    @Column(name = "baskets")
    private Integer baskets;

    @Min(value = 0)
    @Column(name = "rebotes")
    private Integer rebotes;

    @Min(value = 0)
    @Column(name = "asistencias")
    private Integer asistencias;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "posicion_campo", nullable = false)
    private PosicionesJugadores posicionCampo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBaskets() {
        return baskets;
    }

    public void setBaskets(Integer baskets) {
        this.baskets = baskets;
    }

    public Integer getRebotes() {
        return rebotes;
    }

    public void setRebotes(Integer rebotes) {
        this.rebotes = rebotes;
    }

    public Integer getAsistencias() {
        return asistencias;
    }

    public void setAsistencias(Integer asistencias) {
        this.asistencias = asistencias;
    }

    public PosicionesJugadores getPosicionCampo() {
        return posicionCampo;
    }

    public void setPosicionCampo(PosicionesJugadores posicionCampo) {
        this.posicionCampo = posicionCampo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Player player = (Player) o;
        if(player.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, player.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Player{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", baskets='" + baskets + "'" +
            ", rebotes='" + rebotes + "'" +
            ", asistencias='" + asistencias + "'" +
            ", posicionCampo='" + posicionCampo + "'" +
            '}';
    }
}
