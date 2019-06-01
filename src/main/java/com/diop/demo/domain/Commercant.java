package com.diop.demo.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Commercant.
 */
@Entity
@Table(name = "commercant")
public class Commercant implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "nom", length = 60, nullable = false)
    private String nom;

    @OneToMany(mappedBy = "commercant")
    private Set<CommercantInformations> information = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Commercant nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<CommercantInformations> getInformation() {
        return information;
    }

    public Commercant information(Set<CommercantInformations> commercantInformations) {
        this.information = commercantInformations;
        return this;
    }

    public Commercant addInformation(CommercantInformations commercantInformations) {
        this.information.add(commercantInformations);
        commercantInformations.setCommercant(this);
        return this;
    }

    public Commercant removeInformation(CommercantInformations commercantInformations) {
        this.information.remove(commercantInformations);
        commercantInformations.setCommercant(null);
        return this;
    }

    public void setInformation(Set<CommercantInformations> commercantInformations) {
        this.information = commercantInformations;
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
        Commercant commercant = (Commercant) o;
        if (commercant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commercant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Commercant{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
