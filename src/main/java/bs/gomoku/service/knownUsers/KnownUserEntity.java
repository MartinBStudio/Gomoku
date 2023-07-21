package bs.gomoku.service.knownUsers;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class KnownUserEntity {
    @Id
    @Column
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "id_knownUserSequence")
    @SequenceGenerator(name = "id_knownUserSequence", allocationSize = 1)
    public int id;
    public String userName;
    @Column(length = 100)
    public String userId;
    public KnownUserEntity(String userName, String userId) {
        this.userName = userName;
        this.userId = userId;
    }
}
