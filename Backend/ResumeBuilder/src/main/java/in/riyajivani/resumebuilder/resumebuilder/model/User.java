package in.riyajivani.resumebuilder.resumebuilder.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

//    @OneToOne(mappedBy = "user" , cascade = CascadeType.ALL)
//    private Details details;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Education> educations;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Experience> experiences;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_skill", joinColumns = {@JoinColumn(name = "user_fk")}, inverseJoinColumns = {@JoinColumn(name = "skill_fk")})
    private Set<Skill> skills;

    @Column(name = "email")
    private String email;

    @Column(name ="password")
    private String password;

    public int getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public Details getDetails() {
//        return details;
//    }
//
//    public void setDetails(Details details) {
//        this.details = details;
//    }

    public List<Education> getEducation() {
        return educations;
    }

    public void setEducation(List<Education> educations) {
        this.educations = educations;
    }

    public List<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
//                ", details=" + details +
                ", educations=" + educations +
                ", experiences=" + experiences +
                ", skills=" + skills +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
