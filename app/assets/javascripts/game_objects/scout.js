Scout = function(options){
  this.initialize = function(options){
    this.validate_options(options);
    this.general = options.general
    this.unit = options.unit;
    this.world = options.world;
    this.origin = options.unit.animation;
    this.field = options.field;
    this.range = 3;
  };

  this.validate_options = function(){
    if (!(options.general instanceof General)){ throw('Scout cannot be initialized without a General') }
    if (!(options.unit instanceof Unit)){ throw('Scout cannot be initialized without a Unit') }
  };

  this.survey = function(){
    this.calculate_regions();
    this.calculate_enemies();
    this.calculate_neighbors();
    this.calculate_paths();
  };

  this.closest_vacant_region_pid = function(){
    var self = this, vacant_regions = _.filter(this.regions, function(region){
      return region.el.residing_ally == undefined && region.el.residing_enemy == undefined && !(region.x == self.origin.el.x && region.y == self.origin.el.y) 
    });
    return _.min(vacant_regions, function(region){ return region.distance }).pid
  };

  this.calculate_enemies = function(){
    var self = this, 
      residing_enemy,
      enemies = _.filter(this.world.units, function(unit){return unit.force.name != self.unit.force.name }),
      allies = _.filter(this.world.units, function(unit){
        return unit != self.unit && unit.force.name == self.unit.force.name
      }); 
    _.each(this.regions, function(region){
      residing_enemy = _.filter(enemies, function(enemy){return enemy.animation.el.x == region.x && enemy.animation.el.y == region.y});

      residing_ally = _.filter(allies, function(ally){return ally.animation.el.x == region.x && ally.animation.el.y == region.y});
      if(residing_enemy.length > 0){ region.el.mark_enemy(residing_enemy[0]); }
      if(residing_ally.length > 0){ region.el.mark_ally(residing_ally[0]); }
    });
  };

  this.rest = function(){
    var field = this.field;
    _.each( this.regions, function(region){
      field.removeChild(region.el);
      delete region;
    });
    this.regions = [];
  };

  this.mountain = function(x, y){
    var mountain_region = _.find(App.mountains, function(mountain){return mountain.x == x && mountain.y == y});
    return mountain_region != undefined;
  };

  this.calculate_regions = function(){
    var self = this;
    this.regions = []; 
    var range = this.range, x, y;
    for(var row = -range; row <= range; row++){ x = this.origin.el.x + row * 32;
      for(var col = -range; col <= range; col++){ y = this.origin.el.y + col * 32;
        if (!this.mountain(x, y)){
          this.add_region(x, y);
        }
      }
    }
  };

  this.add_region = function(x, y){
    this.regions.push(new ScoutRegion({discoverer: this, field: this.field, x: x, y: y})); 
  };

  this.calculate_neighbors = function(){
    var self = this;
    _.each(this.regions, function(region){ region.neighbors = Neighbors.go(region, self.regions); });
  };

  this.fetch_start_region = function(){
    var origin = this.origin;
    return _.find(this.regions, function(region){return region.x == origin.el.x && region.y == origin.el.y;})
  };

  this.fetch_region_by_pid = function(pid){
    return _.find(this.regions, function(region){return region.pid == pid;})
  };

  this.calculate_paths = function(){
    var start_node = this.fetch_start_region();
    this.paths = Dijkstra.go(start_node, _.indexBy(this.regions, 'pid')); 
  }
 
  this.initialize(options);
};