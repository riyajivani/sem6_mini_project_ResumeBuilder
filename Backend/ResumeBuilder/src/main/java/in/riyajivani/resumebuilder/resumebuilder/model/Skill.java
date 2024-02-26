package in.riyajivani.resumebuilder.resumebuilder.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user_skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_skill", joinColumns={@JoinColumn(name = "skill_fk")}, inverseJoinColumns ={@JoinColumn(name = "user_fk")})
    private Set<User> users;

    private String skill;

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    @Override
    public String toString() {
        return "Skill{" +
                "skillId=" + skillId +
                ", users=" + users +
                ", skill='" + skill + '\'' +
                '}';
    }
}