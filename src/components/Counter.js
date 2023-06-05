import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

export function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const incrementlike = () => setLike(like + 1);
  const incrementdislike = () => setDislike(dislike + 1);
  return (
    <div>

      <IconButton aria-label="like" onClick={incrementlike} color="primary">
        <Badge badgeContent={like} color="primary">
          👍
        </Badge>
      </IconButton>
      <IconButton aria-label="dislike" onClick={incrementdislike} color="error">
        <Badge badgeContent={dislike} color="error">
          👎
        </Badge>
      </IconButton>

    </div>
  );
}
