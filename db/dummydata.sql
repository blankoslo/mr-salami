BEGIN;
INSERT INTO events (id, time, place) VALUES( 'en', current_date + interval '4 day', 'Oscarsborg');
INSERT INTO events (id, time, place) VALUES( 'to', current_date + interval '5 day', 'Drøbak Pizza og bar');
INSERT INTO events (id, time, place) VALUES( 'tre', current_date + interval '6 day', 'Pizza, men pasta');

/*
MAGNE: U0A9R2Y1X  
THEODOR: U02BQG9PP08
Sandra: U02JDEXKZJQ
Kim: U02CDLPFJKA
Kevin: U02AU5AHXGW
*/
INSERT INTO invitations (event_id,slack_id) VALUES( 'en', 'U0A9R2Y1X' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'en', 'U02BQG9PP08', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'en', 'U02JDEXKZJQ', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'en', 'U02CDLPFJKA', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'en', 'U02AU5AHXGW', 'attending' );

INSERT INTO invitations (event_id,slack_id ) VALUES( 'to', 'U0A9R2Y1X' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'to', 'U02BQG9PP08', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'to', 'U02JDEXKZJQ', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'to', 'U02CDLPFJKA', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'to', 'U02AU5AHXGW', 'attending' );

INSERT INTO invitations (event_id,slack_id ) VALUES( 'tre', 'U0A9R2Y1X' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'tre', 'U02BQG9PP08', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'tre', 'U02JDEXKZJQ', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'tre', 'U02CDLPFJKA', 'attending' );
INSERT INTO invitations (event_id,slack_id, rsvp) VALUES( 'tre', 'U02AU5AHXGW', 'attending' );

COMMIT;
