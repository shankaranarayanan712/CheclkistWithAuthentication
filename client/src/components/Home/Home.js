import React from 'react';
import { Container, Grow, Grid} from '@material-ui/core';
import TodoList from '../Checklist/TodoList';

import useStyles from './styles';

const Home = () => {
  const classes = useStyles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={6} sm={6} md={9}>
            <TodoList />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
