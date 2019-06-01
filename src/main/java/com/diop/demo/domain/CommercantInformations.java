package com.diop.demo.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CommercantInformations.
 */
@Entity
@Table(name = "commercant_informations")
public class CommercantInformations implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1, max = 40)
    @Column(name = "cle", length = 40)
    private String cle;

    @Column(name = "valeur")
    private String valeur;

    @ManyToOne
    @JsonIgnoreProperties("information")
    private Commercant commercant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCle() {
        return cle;
    }

    public CommercantInformations cle(String cle) {
        this.cle = cle;
        return this;
    }

    public void setCle(String cle) {
        this.cle = cle;
    }

    public String getValeur() {
        return valeur;
    }

    public CommercantInformations valeur(String valeur) {
        this.valeur = valeur;
        return this;
    }

    public void setValeur(String valeur) {
        this.valeur = valeur;
    }

    public Commercant getCommercant() {
        return commercant;
    }

    public CommercantInformations commercant(Commercant commercant) {
        this.commercant = commercant;
        return this;
    }

    public void setCommercant(Commercant commercant) {
        this.commercant = commercant;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CommercantInformations commercantInformations = (CommercantInformations) o;
        if (commercantInformations.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commercantInformations.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommercantInformations{" +
            "id=" + getId() +
            ", cle='" + getCle() + "'" +
            ", valeur='" + getValeur() + "'" +
            "}";
    }
}
