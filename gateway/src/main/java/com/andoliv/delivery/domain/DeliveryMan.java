package com.andoliv.delivery.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DeliveryMan.
 */
@Entity
@Table(name = "delivery_man")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DeliveryMan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "salary")
    private String salary;

    @OneToOne
    @JoinColumn(unique = true)
    private UserExtra userExtra;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public DeliveryMan salary(String salary) {
        this.salary = salary;
        return this;
    }

    public UserExtra getUserExtra() {
        return userExtra;
    }

    public void setUserExtra(UserExtra userExtra) {
        this.userExtra = userExtra;
    }

    public DeliveryMan userExtra(UserExtra userExtra) {
        this.userExtra = userExtra;
        return this;
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
        DeliveryMan deliveryMan = (DeliveryMan) o;
        if (deliveryMan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryMan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryMan{" +
            "id=" + getId() +
            ", salary='" + getSalary() + "'" +
            "}";
    }
}
