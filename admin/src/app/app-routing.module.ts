import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenceComponent } from './expence/add-expence/add-expence.component';
import { EditExpenceComponent } from './expence/edit-expence/edit-expence.component';
import { ExpenceListComponent } from './expence/expence-list/expence-list.component';
import { AddMemberComponent } from './member/add-member/add-member.component';
import { EditMemberComponent } from './member/edit-member/edit-member.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },

  { path: 'dashboard', component: DashboardComponent  ,canActivate: [AuthGuard] },
  // Member
  { path: 'addmember', component: AddMemberComponent,canActivate: [AuthGuard]  },
  { path: 'editmember/:id', component: EditMemberComponent,canActivate: [AuthGuard]  },
  { path: 'members', component: MemberListComponent,canActivate: [AuthGuard]  },
// Expence
  { path: 'addexpence', component: AddExpenceComponent,canActivate: [AuthGuard]  },
  { path: 'editexpence/:id', component: EditExpenceComponent,canActivate: [AuthGuard]  },
  { path: 'expences', component: ExpenceListComponent,canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
