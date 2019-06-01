package com.diop.demo.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Evenement.
 */
@Entity
@Table(name = "evenement")
public class Evenement implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 40)
    @Column(name = "nom", length = 40, nullable = false)
    private String nom;

    @Column(name = "detail")
    private String detail;

    @Size(max = 40)
    @Column(name = "lieu_depart", length = 40)
    private String lieuDepart;

    @Size(max = 40)
    @Column(name = "lieu_destination", length = 40)
    private String lieuDestination;

    @Column(name = "date_depart")
    private LocalDate dateDepart;

    @Column(name = "date_retour")
    private LocalDate dateRetour;

    @Column(name = "date_reflexion")
    private LocalDate dateReflexion;

    @Column(name = "date_creation")
    private LocalDate dateCreation;

    @OneToOne
    @JoinColumn(unique = true)
    private Commercant commercant;

    @OneToMany(mappedBy = "evenement")
    private Set<Participant> participants = new HashSet<>();
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

    public Evenement nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDetail() {
        return detail;
    }

    public Evenement detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getLieuDepart() {
        return lieuDepart;
    }

    public Evenement lieuDepart(String lieuDepart) {
        this.lieuDepart = lieuDepart;
        return this;
    }

    public void setLieuDepart(String lieuDepart) {
        this.lieuDepart = lieuDepart;
    }

    public String getLieuDestination() {
        return lieuDestination;
    }

    public Evenement lieuDestination(String lieuDestination) {
        this.lieuDestination = lieuDestination;
        return this;
    }

    public void setLieuDestination(String lieuDestination) {
        this.lieuDestination = lieuDestination;
    }

    public LocalDate getDateDepart() {
        return dateDepart;
    }

    public Evenement dateDepart(LocalDate dateDepart) {
        this.dateDepart = dateDepart;
        return this;
    }

    public void setDateDepart(LocalDate dateDepart) {
        this.dateDepart = dateDepart;
    }

    public LocalDate getDateRetour() {
        return dateRetour;
    }

    public Evenement dateRetour(LocalDate dateRetour) {
        this.dateRetour = dateRetour;
        return this;
    }

    public void setDateRetour(LocalDate dateRetour) {
        this.dateRetour = dateRetour;
    }

    public LocalDate getDateReflexion() {
        return dateReflexion;
    }

    public Evenement dateReflexion(LocalDate dateReflexion) {
        this.dateReflexion = dateReflexion;
        return this;
    }

    public void setDateReflexion(LocalDate dateReflexion) {
        this.dateReflexion = dateReflexion;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public Evenement dateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Commercant getCommercant() {
        return commercant;
    }

    public Evenement commercant(Commercant commercant) {
        this.commercant = commercant;
        return this;
    }

    public void setCommercant(Commercant commercant) {
        this.commercant = commercant;
    }

    public Set<Participant> getParticipants() {
        return participants;
    }

    public Evenement participants(Set<Participant> participants) {
        this.participants = participants;
        return this;
    }

    public Evenement addParticipant(Participant participant) {
        this.participants.add(participant);
        participant.setEvenement(this);
        return this;
    }

    public Evenement removeParticipant(Participant participant) {
        this.participants.remove(participant);
        participant.setEvenement(null);
        return this;
    }

    public void setParticipants(Set<Participant> participants) {
        this.participants = participants;
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
        Evenement evenement = (Evenement) o;
        if (evenement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evenement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evenement{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", detail='" + getDetail() + "'" +
            ", lieuDepart='" + getLieuDepart() + "'" +
            ", lieuDestination='" + getLieuDestination() + "'" +
            ", dateDepart='" + getDateDepart() + "'" +
            ", dateRetour='" + getDateRetour() + "'" +
            ", dateReflexion='" + getDateReflexion() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            "}";
    }
}
