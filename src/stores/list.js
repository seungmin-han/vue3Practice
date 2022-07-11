import { defineStore } from "pinia";
import { computed, onMounted, reactive,ref } from "vue";

export const useListStore = defineStore("union", () => {
    let unions = reactive([]);

    const modals = reactive({
        isOpen: false
        , mode: 0 // 0: create, 1: update, 2:delete
        , group: false
        , toDo: false
        , subGroup: false
        , loot: false
        , target: []
        , index: 0
        , text: ""
    });

    const union = reactive({
        name:""
        , address: ""
    });
    
    const memberList = reactive({
        leader:""
        , commander: []
        , endUser: []
    });

    const group = reactive({
        name: ""
        , toDo: []
        , group: []
    })

    const groupList = reactive(
        []
    );

    const toDoList = reactive(
        []
    );

    const toDo = reactive({
        date:""
        , title:""
    });
    
    const lootList = reactive(
        []
    );

    const loot = reactive({
        grade: -1
        , classroom: -1
        , loot:[]
        , group:[]
    });

    const lootInfo = reactive({
        grade: [1,2,3,4,5,6]
        , classroom: [1,2,3,4,5,6,7,8,9]
    });

    const createMember = (level, name) => {
        if(level.trim()=="") {
            alert("계급을 선택해주세요.");
            return;
        }
        if(name.trim()=="") {
            alert("이름을 입력해주세요.");
            return;
        }
        if(level.trim()=="leader") 
        {
            if(memberList.leader.length < 1)    
                memberList.leader = name;
        } 
        else if(level.trim()=="commander") 
        {
            if(memberList.commander.length < 7)
                memberList.commander.push(name);
        }
        else 
        {
            memberList.endUser.push(name);
        }
    }

    const deleteMember = (level, index) => {
        if(level.trim()=="leader") 
        {
            memberList.leader = "";
        } 
        else if(level.trim()=="commander") 
        {
            memberList.commander.splice(index, 1);
        }
        else 
        {
            memberList.endUser.splice(index, 1);
        }
        
    }

    const togglePop = (type, target = [], index, mode=0) => {
        
        modals.isOpen = !modals.isOpen;
        modals.target = target;
        modals.index = index;
        modals.mode = mode;
        modals.text = type;

        if(type=="group") 
        {
            modals.group = !modals.group;
            group.name = (modals.mode!=0) ? target[modals.index].name : "";
               
        }
        else if(type=="subGroup")
        {
            modals.group = !modals.group;
            modals.subGroup = !modals.subGroup;
        }
        else if(type=="toDo")
        {
            modals.toDo = !modals.toDo;    
            toDo.title = (modals.mode!=0) ? target[modals.index].title : "";
            toDo.date = (modals.mode!=0) ? target[modals.index].date : "";   
        }
        else if(type=="loot")
        {
            modals.loot = !modals.loot;
            loot.grade = (modals.mode!=0) ? target[modals.index].grade : "";
            loot.classroom = (modals.mode!=0) ? target[modals.index].classroom : "";

        }
    }

    const createGroup = () => {
        if(modals.target.length == 0)
        {
            groupList.push({...group});
        }
        else
        {
            modals.target.group.push({...group});
        }

        group.name = "";
        group.toDo = [];
        group.group = [];

        togglePop("group");
    }

    const updateGroup = () => {
        modals.target[modals.index].name=group.name;

        group.name = "";
        group.toDo = [];
        group.group = [];

        togglePop("group");
    }

    const deleteGroup = () => {
        modals.target.splice(modals.index, 1);

        togglePop("group");
    }

    const createToDo = () => {
        if(modals.target.length == 0) 
        {
            toDoList.push({...toDo});
        }
        else
        {
            modals.target.toDo.push({...toDo});
        }
        toDo.date = "";
        toDo.title = "";

        togglePop('toDo');
    }

    const updateToDo = () => {
        modals.target[modals.index].date=toDo.date;
        modals.target[modals.index].title=toDo.title;
        
        toDo.date = "";
        toDo.title = "";

        togglePop('toDo');
    }

    const deleteToDo = () => {
        modals.target.splice(modals.index, 1);
        togglePop('toDo');
    }

    const createLoot = () => {
        console.log(modals);
        if(modals.target.length == 0)
        {
            lootList.push({...loot});
        }
        else
        {
            modals.target.loot.push({...loot});
        }

        loot.grade = -1;
        loot.classroom = -1;
        loot.group = [];
        loot.loot = [];
        togglePop("loot");
    }

    const updateLoot = () => {
        modals.target[modals.index].grade=loot.grade;
        modals.target[modals.index].classroom=loot.classroom;

        
        loot.grade = -1;
        loot.classroom = -1;
        loot.group = [];
        loot.loot = [];
        togglePop('loot');
    }

    const deleteLoot = () => {
        modals.target.splice(modals.index, 1);

        loot.grade = "";
        loot.classroom = "";
        togglePop('loot');
    }

    const setGroup = (grp) => {
        group.name = grp.name;
        group.toDo = grp.toDo;
        group.group = grp.group;
    }

    const setToDo = (td) => {
        toDo.date = td.date;
        toDo.title = td.title;
    }

    const setLoot = (lt) => {
        loot.grade= lt.grade;
        loot.classroom= lt.classroom;
        loot.loot= lt.loot;
        loot.group= lt.group;
    }

    const saveData = () => {
        const data = {
            "union": union
            , "memberList": memberList
            , "groupList": groupList
            , "toDoList": toDoList
            , "lootList": lootList
            , "lootInfo": lootInfo
        }
        if(localStorage.getItem("unions"))
            unions.unions = JSON.parse(localStorage.getItem("unions"));
        unions.unions.push(data);
        localStorage.setItem("unions", JSON.stringify(unions.unions));
    }

    const getData = () => {
        if(localStorage.getItem("unions"))
            unions.unions = JSON.parse(localStorage.getItem("unions"));
        console.log(unions);
    }


    return {
        modals
        , togglePop
        , memberList
        , createMember
        , deleteMember
        , group
        , groupList
        , createGroup
        , updateGroup
        , deleteGroup
        , toDo
        , toDoList
        , createToDo
        , updateToDo
        , deleteToDo
        , loot
        , lootList
        , lootInfo
        , createLoot
        , updateLoot
        , deleteLoot
        , unions
        , union
        , setGroup
        , setToDo
        , setLoot
        , saveData
        , getData
    }
});