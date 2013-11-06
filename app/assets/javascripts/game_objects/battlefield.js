Battlefield = function(){
  return({
    initialize: function(){
      var self = this;
      this.game_over = false;
      this.map = new Map();
      this.populate();
      this.turn();
      this.width = 32 * 25;
      this.height = 32 * 25;
    }, 

    turn: function(){
      this.active_unit.start_turn();
    },

    next: function(){
      this.active_unit_index++;
      if (this.active_unit_index > this.units.length - 1){ this.active_unit_index = 0; }
      this.active_unit = this.units[this.active_unit_index];
      this.turn();
    },

    populate: function(){
      var cao_cao = new Force({name: 'Cao Cao'});
      var liu_bei = new Force({name: 'Liu Bei'});
      this.units = [
        new Unit({
          force: liu_bei,
          position: {x: 128, y: 128},
          world: this, 
          type: 'calvalry',
          player: 'user',
          field: this.map.stage, 
          troop_count: 85,
          general: new General({
            force: liu_bei,
            surname: 'zhang',
            given_name: 'fei',
            avatar: 'avatar-zhang_fei.jpeg',
            loyalty: 100,
            intelligence: 32,
            leadership: 85,
            war: 99
          })
        }),         
        new Unit({
          force: liu_bei,
          position: {x: 640, y: 640},
          world: this, 
          type: 'calvalry',
          player: 'user',
          field: this.map.stage, 
          troop_count: 85,
          general: new General({
            force: liu_bei,
            surname: 'zhao',
            given_name: 'yun',
            avatar: 'avatar-zhao_yun.jpeg',
            loyalty: 100,
            intelligence: 80,
            leadership: 90,
            war: 99
          })
        }),
        new Unit({
          force: cao_cao,
          position: {x: 128, y: 384},
          world: this, 
          type: 'calvalry',
          player: 'cpu',
          field: this.map.stage, 
          troop_count: 55,
          general: new General({
            force: cao_cao,
            surname: 'zhang',
            given_name: 'liao',
            avatar: 'avatar-zhang_liao.jpeg',
            loyalty: 100,
            intelligence: 85,
            leadership: 95,
            war: 91
          })
        }),
        new Unit({
          force: cao_cao,
          position: {x: 96, y: 384},
          world: this, 
          type: 'calvalry',
          player: 'cpu',
          field: this.map.stage, 
          troop_count: 55,
          general: new General({
            force: cao_cao,
            surname: 'zhang',
            given_name: 'liao',
            avatar: 'avatar-zhang_liao.jpeg',
            loyalty: 100,
            intelligence: 85,
            leadership: 95,
            war: 91
          })
        }),

        new Unit({
          force: cao_cao,
          position: {x: 64, y: 384},
          world: this, 
          type: 'calvalry',
          player: 'cpu',
          field: this.map.stage, 
          troop_count: 55,
          general: new General({
            force: cao_cao,
            surname: 'zhang',
            given_name: 'liao',
            avatar: 'avatar-zhang_liao.jpeg',
            loyalty: 100,
            intelligence: 85,
            leadership: 95,
            war: 91
          })
        }),
        new Unit({
          force: cao_cao,
          position: {x: 32, y: 384},
          world: this, 
          type: 'calvalry',
          player: 'cpu',
          field: this.map.stage, 
          troop_count: 95,
          general: new General({
            force: cao_cao,
            surname: 'xun',
            given_name: 'yu',
            avatar: 'avatar-xun-yu.jpeg',
            loyalty: 100,
            intelligence: 95,
            leadership: 90,
            war: 51
          })
        })

      ];
      this.active_unit_index = 0;
      this.active_unit = this.units[this.active_unit_index];
    }
  });
};
