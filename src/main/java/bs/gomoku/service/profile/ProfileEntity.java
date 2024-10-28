package bs.gomoku.service.profile;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Table(name="PROFILES")
@Entity
@Builder
@AllArgsConstructor
public class ProfileEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "id_profileSequence")
    @SequenceGenerator(name = "id_profileSequence", allocationSize = 1)
    public int id;
    @Column(length = 40)
    public String userMail;
    @Column(length = 40)
    @Builder.Default public Boolean isMain=false;
    @Column(length = 4000)
    public String profileString;

    public ProfileEntity() {

    }
}
